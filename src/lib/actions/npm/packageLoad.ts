import { join } from 'path';
import { access } from '../../cmd/access';
import { readFile } from '../../cmd/readFile';
import { Action } from '../../types';

type NpmPackageLoadProps = {
  key?: string;
  path?: string;
  throwError?: boolean;
};

const npmPackageLoadAction: Action<NpmPackageLoadProps, unknown> = async (
  { root, log },
  { key, throwError, path = root },
) => {
  const pathPackageJson = join(path, 'package.json');
  const isExists = await access(pathPackageJson);

  if (!isExists) {
    throw new Error('package.json is not found');
  }

  log.debug('Read the package.json');

  const config = await readFile(pathPackageJson, true);

  if (typeof key === 'undefined') {
    return config;
  }

  const value = config[key];

  if (throwError && typeof value === 'undefined') {
    throw new TypeError(`The package.json value "${key}" is undefiend`);
  }

  return value;
};

export { npmPackageLoadAction };
