import { join } from 'path';
import { isObject, objectEntries } from '@kettil/tool-lib';
import { licenseHeuristics } from '../../configs/licenseHeuristics';
import { access } from '../cmd/access';
import { exec } from '../cmd/exec';
import { readdir } from '../cmd/readdir';
import { readFile } from '../cmd/readFile';
import { Action, LicensePackageInfo, LicensePackages } from '../types';

const regexpFilename = /^(?:copying|licen[cs]e|licen[cs]e-\w+|readme)(?:\.markdown|\.md|\.txt)?$/iu;

const getLicenseFromFiles = async ({
  packagePath,
  data,
}: {
  packagePath: string;
  data: LicensePackageInfo;
}): Promise<LicensePackageInfo | undefined> => {
  const entries = await readdir(packagePath);
  const files = entries
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.') && regexpFilename.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  // eslint-disable-next-line no-restricted-syntax -- the loop should be canceled after the first find
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop -- the loop should be canceled after the first find
    const content = await readFile(join(packagePath, file));

    // eslint-disable-next-line no-restricted-syntax -- the loop should be canceled after the first find
    for (const [aliasLicense, regexp] of objectEntries(licenseHeuristics)) {
      if (regexp.test(content)) {
        return { ...data, license: aliasLicense };
      }
    }
  }

  return undefined;
};

const getNodePackageInfo: Action<
  { packagePath: string; ignorePackages: string[]; licensePackages: LicensePackages },
  LicensePackageInfo | undefined
> = async ({ cwd, log }, { packagePath, ignorePackages, licensePackages }) => {
  const packageJsonPath = join(packagePath, 'package.json');

  const hasPackageJson = await access(packageJsonPath);

  if (!hasPackageJson) {
    // No node.js package
    return undefined;
  }

  const { name, license, version } = await readFile(packageJsonPath, true);

  if (typeof name !== 'string') {
    throw new TypeError(`Package name is not defined (${packageJsonPath})`);
  }

  if (ignorePackages.includes(name)) {
    return undefined;
  }

  const data = {
    path: packagePath.slice(Math.max(0, cwd.length + 1)),
    version: typeof version === 'string' ? version : 'UNKNOWN',
    license: 'UNKNOWN',
    name,
  };

  // Manual license assignment
  const licensePackage = licensePackages[data.name];

  if (isObject(licensePackage) && typeof licensePackage[data.version] === 'string') {
    return { ...data, license: licensePackage[data.version] };
  }

  // License from the package.json
  if (typeof license === 'string') {
    return { ...data, license };
  }

  // License from the package.json
  if (isObject(license) && typeof license.type === 'string') {
    return { ...data, license: license.type };
  }

  // License from copying|license|readme file
  const fileLicense = await getLicenseFromFiles({ packagePath, data });

  if (fileLicense) {
    return fileLicense;
  }

  // License over "npm view"
  const { stdout: npmViewLicense } = await exec({ cmd: 'npm', args: ['view', name, 'license'], log, cwd });

  if (npmViewLicense.trim() !== '') {
    return { ...data, license: npmViewLicense.trim() };
  }

  return data;
};

export { getNodePackageInfo };
