import { isObject, objectEntries } from '@kettil/tool-lib';
import { LicenseCompatibilities } from '../../types';
import { reduceCompatibilityList } from './reduceCompatibilityList';

const getCompatibilityConfig = ({
  config,
  replaceConfig,
  defaultCompatibilities = {},
}: {
  config: Record<number | string, unknown>;
  replaceConfig: boolean;
  defaultCompatibilities?: LicenseCompatibilities;
}): LicenseCompatibilities => {
  const items = replaceConfig ? {} : { ...defaultCompatibilities };
  const { compatibilities } = config;

  if (compatibilities === undefined) {
    return items;
  }

  if (!isObject(compatibilities)) {
    throw new TypeError('.carnarc.json: license.compatibilities is not an object');
  }

  return objectEntries(compatibilities).reduce(reduceCompatibilityList, items);
};

export { getCompatibilityConfig };
