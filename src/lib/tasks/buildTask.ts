import { join } from 'path';
import npmPackageLoad from '../actions/npm/packageLoad';
import babel from '../actions/tools/babel';
import tsc from '../actions/tools/tsc';
import { spinnerAction } from '../cli/spinner';
import access from '../cmd/access';
import { Task } from '../types';
import taskHook from './helpers/taskHook';

export type BuildProps = {};

const buildTask: Task<BuildProps> = async (argv) => {
  await taskHook(argv, { task: 'build', type: 'pre' });

  const isPrivate = await npmPackageLoad(argv, { key: 'private' });
  const hasTypescriptConfig = await access(join(argv.cwd, 'tsconfig.json'), 'readable');

  if (hasTypescriptConfig && isPrivate !== true) {
    await spinnerAction(tsc(argv, { mode: 'type-create' }), 'Build: Typescript');
  }

  await spinnerAction(babel(argv), 'Build: Babel');

  await taskHook(argv, { task: 'build', type: 'post' });
};

export default buildTask;
