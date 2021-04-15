import depcheck from '../actions/tools/depcheck';
import { spinnerAction } from '../cli/spinner';
import DependencyError from '../errors/dependencyError';
import { Task } from '../types';

const depsTask: Task = async (argv) => {
  try {
    await spinnerAction(depcheck(argv), 'Dependency verification');
  } catch (error) {
    if (error instanceof DependencyError) {
      argv.log.log(error.list);

      return;
    }

    throw error;
  }
};

export default depsTask;
