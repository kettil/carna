import { isArray, isString } from '@kettil/tool-lib';
import type { LicenseCompatibilities } from '../../types';

const reduceCompatibilityList = (
  licenseGroups: Partial<LicenseCompatibilities>,
  [licenseName, licenses]: readonly [number | string, unknown],
): LicenseCompatibilities => {
  if (!isString(licenseName)) {
    throw new TypeError('.carnarc.json: license.compatibilities has a key that is not a string');
  }

  if (!isArray(licenses)) {
    throw new TypeError(`.carnarc.json: license.compatibilities.${licenseName} is not an array`);
  }

  if (!licenses.every((license) => isString(license))) {
    throw new TypeError(`.carnarc.json: license.compatibilities.${licenseName} has a value that is not a string`);
  }

  return Object.assign(licenseGroups, {
    [licenseName]: [...(licenseGroups[licenseName] ?? []), ...licenses],
  });
};

export { reduceCompatibilityList };
