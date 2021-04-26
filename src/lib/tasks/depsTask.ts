import { isArray } from '@kettil/tool-lib';
import depcheck from '../actions/tools/depcheck';
import semver from '../actions/tools/semver';
import getConfig from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import DependencyError from '../errors/dependencyError';
import { Task } from '../types';
import npmHookTask from './subTasks/npmHookTask';

export type DepsProps = {};

const depsTask: Task<DepsProps> = async (argv) => {
  try {
    const configIgnorePackages = await getConfig(argv.cwd, 'deps.ignore.packages');
    const ignorePackages = isArray(configIgnorePackages)
      ? configIgnorePackages.filter((v): v is string => typeof v === 'string')
      : [];

    await npmHookTask(argv, { task: ['deps'], type: 'pre' });
    await spinnerAction(depcheck(argv, ignorePackages), 'Dependency verification');
    await spinnerAction(semver(argv), 'Semver check');
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
