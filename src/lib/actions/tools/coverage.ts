import { join } from 'path';
import { createCoverageMap, CoverageMapData } from 'istanbul-lib-coverage';
import { createContext, ReportBase, Watermarks } from 'istanbul-lib-report';
import { create, ReportOptions } from 'istanbul-reports';
import { existFiles } from '../../cmd/existFiles';
import { readFile } from '../../cmd/readFile';
import { writeFile } from '../../cmd/writeFile';
import { MessageError } from '../../errors/messageError';
import { Action } from '../../types';
import { getCoverageErrorMessage } from '../../utils/getCoverageErrorMessage';
import { getCoverageFolder } from '../../utils/getCoverageFolder';
import { getCoverageWatermark } from '../../utils/getCoverageWatermark';
import { CoverageActionProps } from '../types';

const coverageFileName = 'coverage-final.json';
const coverageSuccessKeys = new Set(['high', 'medium']);
const watermarkKeys: Array<keyof Watermarks> = ['statements', 'functions', 'branches', 'lines'];

const coverageAction: Action<CoverageActionProps> = async (argv, { projects, watermarks = {} }) => {
  const coverageFiles = await existFiles(
    projects.map((project) => join(getCoverageFolder(argv.cwd, [project]), coverageFileName)),
  );

  const coveragePath = getCoverageFolder(argv.cwd, []);
  const coverageMap = createCoverageMap({});

  const coverages = await Promise.all(coverageFiles.map((file) => readFile(file, true)));

  coverages.forEach((coverageData) => coverageMap.merge(coverageData as CoverageMapData));

  await writeFile(join(coveragePath, coverageFileName), JSON.stringify(coverageMap));

  const context = createContext({
    coverageMap,
    dir: coveragePath,
    // The summarizer to default to (may be overridden by some reports)
    // values can be nested/flat/pkg. Defaults to 'pkg'
    defaultSummarizer: 'pkg',
    watermarks: watermarkKeys.reduce(
      (data, key) => Object.assign(data, { [key]: getCoverageWatermark(watermarks[key]) }),
      {},
    ),
  });

  const reports: Array<keyof ReportOptions> = ['lcovonly', 'json-summary', 'text-summary'];

  if (!argv.ci) {
    reports.push('html');
  }

  // create reports
  reports.forEach((report) => (create(report, {}) as unknown as ReportBase).execute(context));

  const coverageSummary = coverageMap.getCoverageSummary();
  const coverageErrors = watermarkKeys.filter(
    (key) => !coverageSuccessKeys.has(context.classForPercent(key, coverageSummary[key].pct)),
  );

  if (coverageErrors.length > 0) {
    throw new MessageError(
      coverageErrors.map((key) => getCoverageErrorMessage(key, watermarks, coverageSummary)).join('\n'),
    );
  }
};

export { coverageAction };