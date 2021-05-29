import { join } from 'path';
import { access } from '../../cmd/access';
import { readFile } from '../../cmd/readFile';
import { Action } from '../../types';

type NpmPackageLoadProps = {
  key?: string;
  throwError?: boolean;
};

const getPackagePath = (cwd: string): string => join(cwd, 'package.json');

const npmPackageLoadAction: Action<NpmPackageLoadProps, unknown> = async ({ cwd, log }, { key, throwError }) => {
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

export { npmPackageLoadAction, getPackagePath };
