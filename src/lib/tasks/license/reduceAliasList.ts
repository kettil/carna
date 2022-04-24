import { isObject, isString, objectEntries } from '@kettil/tools';
import type { LicenseAliases } from '../../types';
import { reduceAliasLicenseList } from './reduceAliasLicenseList';

const reduceAliasList = (
  packages: LicenseAliases,
  [packageName, versions]: readonly [number | string, unknown],
): LicenseAliases => {
  if (!isString(packageName)) {
    throw new TypeError('.carnarc.json: license.aliases has a key that is not a string');
  }

  if (!isObject(versions)) {
    throw new TypeError(`.carnarc.json: license.aliases.${packageName} is not an object`);
  }

  return Object.assign(packages, {
    [packageName]: objectEntries(versions).reduce(reduceAliasLicenseList({ packageName }), {
      ...packages[packageName],
    }),
  });
};

export { reduceAliasList };
