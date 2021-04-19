import depcheck from '../actions/tools/depcheck';
import { spinnerAction } from '../cli/spinner';
import DependencyError from '../errors/dependencyError';
import { Task } from '../types';
import npmHookTask from './subTasks/npmHookTask';

export type DepsProps = {};

const depsTask: Task<DepsProps> = async (argv) => {
  try {
    await npmHookTask(argv, { task: ['deps'], type: 'pre' });
    await spinnerAction(depcheck(argv), 'Dependency verification');
    await npmHookTask(argv, { task: ['deps'], type: 'post' });
  } catch (error) {
    if (error instanceof DependencyError) {
      argv.log.log(error.list);

      return;
    }

    throw error;
  }
};

export default depsTask;
