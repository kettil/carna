import { join } from 'path';
import npmPackageLoad from '../actions/npm/packageLoad';
import babel from '../actions/tools/babel';
import tsc from '../actions/tools/tsc';
import webpack from '../actions/tools/webpack';
import { spinnerAction } from '../cli/spinner';
import access from '../cmd/access';
import { Task } from '../types';

const buildTask: Task = async (argv) => {
  const isPrivate = await npmPackageLoad(argv, { key: 'private' });
  const hasTypescriptConfig = await access(join(argv.cwd, 'tsconfig.json'), 'readable');

  if (hasTypescriptConfig && isPrivate !== true) {
    await spinnerAction(tsc(argv, { mode: 'type-create' }), 'Typescript');
  }

  await spinnerAction(babel(argv), 'Babel');
  await spinnerAction(webpack(argv), 'Webpack');
};

export default buildTask;
