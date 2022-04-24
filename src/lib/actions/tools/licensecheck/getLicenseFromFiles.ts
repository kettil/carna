import { join } from 'path';
import { objectEntries } from '@kettil/tools';
import { licenseFilenameRegExp } from '../../../../configs/actionConfigs';
import { readdir } from '../../../cmd/readdir';
import { readFile } from '../../../cmd/readFile';
import type { LicensePackageInfo, LicenseHeuristics } from '../../../types';

const getLicenseFromFiles = async ({
  path,
  data,
  licenseHeuristics,
}: {
  path: string;
  data: LicensePackageInfo;
  licenseHeuristics: LicenseHeuristics;
}): Promise<LicensePackageInfo | undefined> => {
  const entries = await readdir(path);
  const files = entries
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.') && licenseFilenameRegExp.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  // eslint-disable-next-line no-restricted-syntax -- the loop should be canceled after the first find
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop -- the loop should be canceled after the first find
    const content = await readFile(join(path, file));

    // eslint-disable-next-line no-restricted-syntax -- the loop should be canceled after the first find
    for (const [aliasLicense, regexp] of objectEntries(licenseHeuristics)) {
      if (regexp.test(content)) {
        return { ...data, license: aliasLicense };
      }
    }
  }

  return undefined;
};

export { getLicenseFromFiles };
