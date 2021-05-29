import { isArray } from '@kettil/tool-lib';
import { depcheckAction } from '../actions/tools/depcheck';
import { semverAction } from '../actions/tools/semver';
import { getConfig } from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import { DependencyError } from '../errors/dependencyError';
import { Task } from '../types';
import { taskHook } from '../utils/taskHook';

type DepsProps = {};

const depsTask: Task<DepsProps> = async (argv) => {
  const configIgnorePackages = await getConfig(argv.cwd, 'deps.ignore.packages');
  const ignorePackages = isArray(configIgnorePackages)
    ? configIgnorePackages.filter((v): v is string => typeof v === 'string')
    : [];

  await taskHook(argv, { task: 'deps', type: 'pre' });

  try {
    await spinnerAction(depcheckAction(argv, ignorePackages), 'Dependency verification');
  } catch (error) {
    if (!(error instanceof DependencyError)) {
      throw error;
    }

    argv.log.log(error.list);
  }

  await spinnerAction(semverAction(argv), 'Semver check');

  await taskHook(argv, { task: 'deps', type: 'post' });
};

export type { DepsProps };
export { depsTask };
