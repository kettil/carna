import { join } from 'path';
import { isObject, isString } from '@kettil/tools';
import { access } from '../../../cmd/access';
import { execReturn } from '../../../cmd/execReturn';
import { readFile } from '../../../cmd/readFile';
import type { Action, LicensePackageInfo, LicenseAliases, LicenseHeuristics } from '../../../types';
import { getLicenseFromFiles } from './getLicenseFromFiles';

const getLicensePackageInfo: Action<
  { path: string; ignorePackages: string[]; licenseAliases: LicenseAliases; licenseHeuristics: LicenseHeuristics },
  LicensePackageInfo | undefined
> = async ({ cwd, log }, { path, ignorePackages, licenseAliases, licenseHeuristics }) => {
  const packageJsonPath = join(path, 'package.json');

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
    path: path.slice(Math.max(0, cwd.length + 1)),
    version: isString(version) ? version : 'UNKNOWN',
    license: 'UNKNOWN',
    name,
  };

  // Manual license assignment
  const licensePackage = licenseAliases[data.name];

  if (isObject(licensePackage) && isString(licensePackage[data.version])) {
    return { ...data, license: licensePackage[data.version] };
  }

  // License from the package.json
  if (isString(license)) {
    return { ...data, license };
  }

  // License from the package.json
  if (isObject(license) && isString(license.type)) {
    return { ...data, license: license.type };
  }

  // License from copying|license|readme file
  const fileLicense = await getLicenseFromFiles({ path, data, licenseHeuristics });

  if (fileLicense) {
    return fileLicense;
  }

  // License over "npm view"
  const { stdout: npmViewLicense } = await execReturn({ cmd: 'npm', args: ['view', name, 'license'], log, cwd });

  if (npmViewLicense.trim() !== '') {
    return { ...data, license: npmViewLicense.trim() };
  }

  return data;
};

export { getLicensePackageInfo };
