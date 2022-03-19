import type { LicensePackageInfo } from '../types';

type IsLicenseCompatible = (props: {
  packageInfo: LicensePackageInfo;
  compatibleLicences: string[];
  projectLicense: string;
}) => boolean;

const isLicenseCompatible: IsLicenseCompatible = (props) => {
  const { compatibleLicences, projectLicense, packageInfo } = props;
  const { license } = packageInfo;

  if (license.toUpperCase() === projectLicense) {
    return true;
  }

  return compatibleLicences.includes(license.toUpperCase());
};

export { isLicenseCompatible };
