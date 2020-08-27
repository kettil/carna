import { join } from 'path';
import access from '../../lib/cmd/access';
import readFile from '../../lib/cmd/readFile';
import { Action } from '../../lib/types';

const npmName: Action<undefined, string> = async ({ cwd, log }) => {
  const path = join(cwd, 'package.json');
  const isExists = await access(path);

  if (!isExists) {
    throw new Error('package.json is not found');
  }

  log.debug('Read the package.json');

  const config = await readFile(path, true);

  if (typeof config.name !== 'string') {
    throw new TypeError('The package name is not found');
  }

  return config.name;
};

export default npmName;
