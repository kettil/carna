import { join } from 'path';
import { isArray } from '@kettil/tool-lib';
import { bold, red } from 'chalk';
import { createCoverageMap, CoverageMapData, CoverageSummary } from 'istanbul-lib-coverage';
import { createContext, ReportBase, Watermark, Watermarks } from 'istanbul-lib-report';
import { create } from 'istanbul-reports';
import existFiles from '../../cmd/existFiles';
import readFile from '../../cmd/readFile';
import writeFile from '../../cmd/writeFile';
import MessageError from '../../errors/messageError';
import { Action } from '../../types';
import { getCoverageFolder } from './jest';

export type WatermarkThreshold = Watermark | number | undefined;

type CoverageProps = {
  projects: string[];
  watermarks?: Partial<Record<keyof Watermarks, WatermarkThreshold>>;
};

const coverageFileName = 'coverage-final.json';
const coverageSuccessKeys = new Set(['high', 'medium']);
const watermarkKeys: Array<keyof Watermarks> = ['statements', 'functions', 'branches', 'lines'];

const getWatermark = (watermark?: Watermark | number | undefined): Watermark => {
  if (isArray(watermark)) {
    return watermark;
  }

  if (typeof watermark === 'number') {
    return [watermark, watermark];
  }

  return [90, 99];
};

const getErrorMessage = (
  key: keyof Watermarks,
  watermarks: Partial<Record<keyof Watermarks, Watermark | number>>,
  coverageSummary: CoverageSummary,
): string => {
  const limit = Math.min(...getWatermark(watermarks[key]));
  const value = coverageSummary[key].pct;

  return red(`Coverage threshold for ${bold(key)} (${limit}%) not met: ${value}%`);
};

const coverage: Action<CoverageProps> = async (argv, { projects, watermarks = {} }) => {
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
    watermarks: watermarkKeys.reduce((data, key) => Object.assign(data, { [key]: getWatermark(watermarks[key]) }), {}),
  });

  // create reports
  ((create('lcovonly', {}) as unknown) as ReportBase).execute(context);
  ((create('json-summary', {}) as unknown) as ReportBase).execute(context);
  ((create('text-summary', {}) as unknown) as ReportBase).execute(context);

  if (!argv.ci) {
    ((create('html', {}) as unknown) as ReportBase).execute(context);
  }

  const coverageSummary = coverageMap.getCoverageSummary();

  const coverageErrors = watermarkKeys.filter(
    (key) => !coverageSuccessKeys.has(context.classForPercent(key, coverageSummary[key].pct)),
  );

  if (coverageErrors.length > 0) {
    throw new MessageError(coverageErrors.map((key) => getErrorMessage(key, watermarks, coverageSummary)).join('\n'));
  }
};

export default coverage;
