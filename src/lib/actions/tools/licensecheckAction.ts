import { basename } from 'path';
import { isArray } from '@kettil/tool-lib';
import { red } from 'chalk';
import { LicenseDisabledError } from '../../errors/licenseDisabledError';
import { LicenseIncompatibleError } from '../../errors/licenseIncompatibleError';
import { Action, LicensePackageInfo } from '../../types';
import { getNodeModulePaths } from '../../utils/getNodeModulePaths';
import { isLicenseCompatible } from '../../utils/isLicenseCompatible';
import { LicensecheckActionProps } from '../types';
import { getLicensePackageInfo } from './licensecheck/getLicensePackageInfo';

const licensecheckAction: Action<LicensecheckActionProps> = async (argv, { path = argv.root, licenseConfig }) => {
  const { aliases, compatibilities, heuristics, ignorePackages } = licenseConfig;
  const { log } = argv;

  const projectInfo = await getLicensePackageInfo(argv, {
    path,
    ignorePackages: [],
    licenseAliases: {},
    licenseHeuristics: {},
  });

  if (!projectInfo) {
    throw new Error('Project package data was not found');
  }

  const projectLicense = projectInfo.license;
  const supportedLicenses = Object.keys(compatibilities).sort();
  const compatibleLicences = compatibilities[projectLicense];

  if (!isArray(compatibleLicences)) {
    const workspaceContext = path === argv.root ? '' : ` for "${basename(path)}"`;

    throw new LicenseDisabledError(
      'The project license has no compatibility group',
      `License verification${workspaceContext} is disabled (${projectLicense} != ${supportedLicenses.join('|')})`,
    );
  }

  log.info('Get the paths of the packages');

  const packagePaths = await getNodeModulePaths(path);

  log.info('Read the license data');

  const packageInfos = await Promise.all(
    packagePaths.map((packagePath) =>
      getLicensePackageInfo(argv, {
        path: packagePath,
        ignorePackages,
        licenseAliases: aliases,
        licenseHeuristics: heuristics,
      }),
    ),
  );

  log.info('Validation of the license data');

  const licenseCompatibleProps = {
    compatibleLicences: compatibleLicences.map((v) => v.toUpperCase()),
    projectLicense,
  };

  const incompatibleLicenses: Array<[string, string, string, string, string]> = packageInfos
    .filter((v): v is LicensePackageInfo => v !== undefined)
    .filter((packageInfo) => !isLicenseCompatible({ ...licenseCompatibleProps, packageInfo }))
    .map((data, index) => [`${index + 1}`, data.name, data.license, data.version, data.path]);

  if (incompatibleLicenses.length > 0) {
    incompatibleLicenses.unshift([red('#'), red('Name'), red('License'), red('Version'), red('Path')]);

    throw new LicenseIncompatibleError('Incompatible licenses found', incompatibleLicenses);
  }
};

export { licensecheckAction };
