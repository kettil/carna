import { basename } from 'path';
import { isArray, isString } from '@kettil/tool-lib';
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { depcheckAction } from '../actions/tools/depcheck';
import { semverAction } from '../actions/tools/semver';
import { getConfig } from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import { DependencyError } from '../errors/dependencyError';
import { DependencyWarn } from '../errors/dependencyWarn';
import type { Task } from '../types';
import { taskHook } from '../utils/taskHook';

type DepsProps = {};

const depsTask: Task<DepsProps> = async (argv) => {
  const configIgnorePackages = await getConfig(argv.root, 'deps.ignore.packages');
  const workspacePaths = await npmPackageWorkspacesAction(argv);
  const ignorePackages = isArray(configIgnorePackages) ? configIgnorePackages.filter(isString) : [];

  await taskHook(argv, { task: 'deps', type: 'pre' });

  await [argv.root, ...workspacePaths].reduce(
    async (promise, path) =>
      promise.then(async () => {
        try {
          const subTitle = path === argv.root ? '' : `[${basename(path)}]`;

          await spinnerAction(depcheckAction(argv, { path, ignorePackages }), `Dependency verification ${subTitle}`);
        } catch (error: unknown) {
          if (error instanceof DependencyError) {
            argv.log.log(error.list);

            throw error;
          }

          if (!(error instanceof DependencyWarn)) {
            throw error;
          }

          argv.log.log(error.list);
        }
      }),
    Promise.resolve(),
  );

  await spinnerAction(semverAction(argv, {}), 'Semver check');

  await workspacePaths.reduce(
    async (promise, path) =>
      promise.then(async () => spinnerAction(semverAction(argv, { path }), `Semver check [${basename(path)}]`)),
    Promise.resolve(),
  );

  await taskHook(argv, { task: 'deps', type: 'post' });
};

export type { DepsProps };
export { depsTask };
