import npmPackageLoad from '../actions/npm/packageLoad';
import babel from '../actions/tools/babel';
import tsc from '../actions/tools/tsc';
import { spinnerAction } from '../cli/spinner';
import FirstExistFileError from '../errors/firstExistFileError';
import { Task } from '../types';
import taskHook from './helpers/taskHook';

export type BuildProps = {};

const buildTask: Task<BuildProps> = async (argv) => {
  await taskHook(argv, { task: 'build', type: 'pre' });

  const isPrivate = await npmPackageLoad(argv, { key: 'private' });

  try {
    if (isPrivate !== true) {
      await spinnerAction(tsc(argv, { mode: 'type-create' }), 'Build: Typescript');
    }
  } catch (error) {
    if (!(error instanceof FirstExistFileError)) {
      throw error;
    }
  }

  try {
    await spinnerAction(babel(argv), 'Build: Babel');
  } catch (error) {
    if (!(error instanceof FirstExistFileError)) {
      throw error;
    }
  }

  await taskHook(argv, { task: 'build', type: 'post' });
};

export default buildTask;
