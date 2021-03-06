import { join } from 'path';
import access from '../../lib/cmd/access';
import readFile from '../../lib/cmd/readFile';
import { Action } from '../../lib/types';

type Props = {
  key?: string;
  throwError?: boolean;
};

export const getPackagePath = (cwd: string): string => join(cwd, 'package.json');

const npmPackageLoad: Action<Props, unknown> = async ({ cwd, log }, { key, throwError }) => {
  const path = getPackagePath(cwd);
  const isExists = await access(path);

  if (!isExists) {
    throw new Error('package.json is not found');
  }

  log.debug('Read the package.json');

  const config = await readFile(path, true);

  if (typeof key === 'undefined') {
    return config;
  }

  const value = config[key];

  if (throwError && typeof value === 'undefined') {
    throw new TypeError(`The package.json value "${key}" is undefiend`);
  }

  return value;
};

export default npmPackageLoad;
