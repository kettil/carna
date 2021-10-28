import { isArray, isObject, isString } from '@kettil/tool-lib';

const isArrayString = (values: unknown[]): values is string[] => values.every((value) => isString(value));

const getIgnoreConfig = ({ config }: { config: Record<number | string, unknown> }): string[] => {
  const { ignore } = config;

  if (ignore === undefined) {
    return [];
  }

  if (!isObject(ignore)) {
    throw new TypeError('.carnarc.json: license.ignore is not an object');
  }

  if (!isArray(ignore.packages)) {
    throw new TypeError('.carnarc.json: license.ignore.packages is not an array');
  }

  if (!isArrayString(ignore.packages)) {
    throw new TypeError('.carnarc.json: license.ignore.packages has a value that is not a string');
  }

  return ignore.packages;
};

export { getIgnoreConfig };
