import { isObject, objectEntries } from '@kettil/tools';
import type { LicenseAliases } from '../../../types';
import { reduceAliasList } from './reduceAliasList';

const getAliasConfig = ({
  config,
  replaceConfig,
  defaultAliases = {},
}: {
  config: Record<number | string, unknown>;
  replaceConfig: boolean;
  defaultAliases?: LicenseAliases;
}): LicenseAliases => {
  const items = replaceConfig ? {} : { ...defaultAliases };
  const { aliases } = config;

  if (aliases === undefined) {
    return items;
  }

  if (!isObject(aliases)) {
    throw new TypeError('.carnarc.json: license.aliases is not an object');
  }

  return objectEntries(aliases).reduce(reduceAliasList, items);
};

export { getAliasConfig };
