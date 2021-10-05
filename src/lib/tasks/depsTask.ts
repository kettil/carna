import { basename } from 'path';
import { isArray } from '@kettil/tool-lib';
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { depcheckAction } from '../actions/tools/depcheck';
import { semverAction } from '../actions/tools/semver';
import { getConfig } from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import { DependencyError } from '../errors/dependencyError';
import { Task } from '../types';
import { taskHook } from '../utils/taskHook';

type DepsProps = {};

const depsTask: Task<DepsProps> = async (argv) => {
  const configIgnorePackages = await getConfig(argv.root, 'deps.ignore.packages');
  const workspacePaths = await npmPackageWorkspacesAction(argv);
  const ignorePackages = isArray(configIgnorePackages)
    ? configIgnorePackages.filter((v): v is string => typeof v === 'string')
    : [];

  await taskHook(argv, { task: 'deps', type: 'pre' });

  try {
    await spinnerAction(depcheckAction(argv, { path: argv.root, ignorePackages }), 'Dependency verification');

    await workspacePaths.reduce(
      (promise, workspacePath) =>
        promise.then(() =>
          spinnerAction(
            depcheckAction(argv, { path: workspacePath, ignorePackages }),
            `Dependency verification (workspace: ${basename(workspacePath)})`,
          ),
        ),
      Promise.resolve(),
    );
  } catch (error) {
    if (!(error instanceof DependencyError)) {
      throw error;
    }

    argv.log.log(error.list);
  }

  await spinnerAction(semverAction(argv, {}), 'Semver check');

  await workspacePaths.reduce(
    (promise, workspacePath) =>
      promise.then(() =>
        spinnerAction(
          semverAction(argv, { path: workspacePath }),
          `Semver check (workspace: ${basename(workspacePath)})`,
        ),
      ),
    Promise.resolve(),
  );

  await taskHook(argv, { task: 'deps', type: 'post' });
};

export type { DepsProps };
export { depsTask };
