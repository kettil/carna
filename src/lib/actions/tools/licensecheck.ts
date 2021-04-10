import { isArray } from '@kettil/tool-lib';
import { red } from 'chalk';
import licenseCompatibilities from '../../../configs/licenseCompatibilities';
import licensePackages from '../../../configs/licensePackages';
import getConfig from '../../cli/config';
import LicenseDisabledError from '../../errors/licenseDisabledError';
import LicenseIncompatibleError from '../../errors/licenseIncompatibleError';
import { Action, LicensePackageInfo } from '../../types';
import getPackageInfo from './helpers/getPackageInfo';
import getPackagePaths from './helpers/getPackagePaths';
import isLicenseCompatible from './helpers/isLicenseCompatible';

const licensecheck: Action = async (argv) => {
  const { cwd, log } = argv;

  const projectInfo = await getPackageInfo(argv, { packagePath: cwd, ignorePackages: [], licensePackages: {} });

  if (!projectInfo) {
    throw new Error('Project package data was not found');
  }

  const projectLicense = projectInfo.license;
  const supportedLicenses = Object.keys(licenseCompatibilities).sort();
  const compatibleLicences = licenseCompatibilities[projectLicense];

  if (!isArray(compatibleLicences)) {
    throw new LicenseDisabledError(
      'The project license has no compatibility group',
      `License verification is disabled (${projectLicense} != ${supportedLicenses.join('|')})`,
    );
  }

  const configIgnorePackages = await getConfig(cwd, 'license.ignore.packages');
  const ignorePackages = isArray(configIgnorePackages)
    ? configIgnorePackages.filter((v): v is string => typeof v === 'string')
    : [];

  log.info('Get the paths of the packages');

  const packagePaths = await getPackagePaths(cwd);

  log.info('Read the license data');

  const packageInfos = await Promise.all(
    packagePaths.map((packagePath) => getPackageInfo(argv, { packagePath, ignorePackages, licensePackages })),
  );

  log.info('Validation of the license data');

  const licenseCompatibleProps = {
    compatibleLicences: compatibleLicences.map((v) => v.toUpperCase()),
    projectLicense,
  };

  const incompatibleLicenses: Array<[string, string, string, string, string]> = packageInfos
    .filter((v): v is LicensePackageInfo => v !== undefined)
    .filter((packageInfo) => !isLicenseCompatible({ ...licenseCompatibleProps, packageInfo }))
    .map(({ name, license, version, path }, index) => [`${index + 1}`, name, license, version, path]);

  if (incompatibleLicenses.length > 0) {
    incompatibleLicenses.unshift([red('#'), red('Name'), red('License'), red('Version'), red('Path')]);

    throw new LicenseIncompatibleError('Incompatible licenses found', incompatibleLicenses);
  }
};

export default licensecheck;
