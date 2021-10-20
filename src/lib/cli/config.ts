import { join } from 'path';
import { isObject, isString } from '@kettil/tool-lib';
import { access } from '../cmd/access';
import { readFile } from '../cmd/readFile';

const getDataRecursive = (data: unknown, keys: string[]): unknown => {
  const key = keys.shift();

  if (key === undefined) {
    return data;
  }

  return isObject(data) ? getDataRecursive(data[key], keys) : undefined;
};

const getConfig = async (path: string, keyPath?: string): Promise<unknown> => {
  const configPath = join(path, '.carnarc.json');

  const hasConfigFile = await access(configPath, 'readable');

  if (!hasConfigFile) {
    // carna config file is not readable
    return undefined;
  }

  const data = await readFile(configPath, true);

  return isString(keyPath) ? getDataRecursive(data, keyPath.split('.')) : data;
};

export { getConfig };
