/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { readdir } from 'fs/promises';
import { join } from 'path';
import { isObject, objectEntries } from '@kettil/tool-lib';
import licenseHeuristics from '../../../../configs/licenseHeuristics';
import access from '../../../cmd/access';
import exec from '../../../cmd/exec';
import readFile from '../../../cmd/readFile';
import { Action, LicensePackageInfo, LicensePackages } from '../../../types';

type GetPackageInfo = Action<
  { packagePath: string; ignorePackages: string[]; licensePackages: LicensePackages },
  LicensePackageInfo | undefined
>;

const regexpFilename = /^(copying|license|license-\w+|licence|licence-\w+|readme)(\.markdown|\.md|\.txt)?$/iu;

const getPackageInfo: GetPackageInfo = async ({ cwd, log }, { packagePath, ignorePackages, licensePackages }) => {
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
  const entries = await readdir(packagePath, { encoding: 'utf8', withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.') && regexpFilename.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  for (const file of files) {
    const content = await readFile(join(packagePath, file));

    for (const [aliasLicense, regexp] of objectEntries(licenseHeuristics)) {
      if (regexp.test(content)) {
        return { ...data, license: aliasLicense };
      }
    }
  }

  // License over "npm view"
  const { stdout: npmViewLicense } = await exec({ cmd: 'npm', args: ['view', name, 'license'], log, cwd });

  if (npmViewLicense.trim() !== '') {
    return { ...data, license: npmViewLicense.trim() };
  }

  return data;
};

export default getPackageInfo;
