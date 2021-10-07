import { basename } from 'path';
import { npmPackageLoadAction } from '../actions/npm/packageLoad';
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { babelAction } from '../actions/tools/babel';
import { tscAction } from '../actions/tools/tsc';
import { spinnerAction } from '../cli/spinner';
import { Task } from '../types';
import { hasDependency } from '../utils/hasDependency';
import { taskHook } from '../utils/taskHook';

type BuildProps = {};

const buildTask: Task<BuildProps> = async (argv) => {
  await taskHook(argv, { task: 'build', type: 'pre' });

  const workspacePaths = await npmPackageWorkspacesAction(argv);
  const hasTypescript = await hasDependency(argv, { dependency: 'typescript', dependencyType: 'devDependencies' });

  if (hasTypescript) {
    if (workspacePaths.length === 0) {
      const isPrivate = await npmPackageLoadAction(argv, { key: 'private' });

      if (isPrivate !== true) {
        await spinnerAction(tscAction(argv, { mode: 'type-create' }), 'Build: Typescript');
      }
    } else {
      await workspacePaths.reduce(
        (promise, workspacePath) =>
          promise.then(async () => {
            const isPrivate = await npmPackageLoadAction(argv, { key: 'private', path: workspacePath });

            if (isPrivate === true) {
              return Promise.resolve();
            }

            return spinnerAction(
              tscAction({ ...argv, cwd: workspacePath }, { mode: 'type-create' }),
              `Build: Typescript [${basename(workspacePath)}]`,
            );
          }),
        Promise.resolve(),
      );
    }
  }

  if (workspacePaths.length === 0) {
    await spinnerAction(babelAction(argv), 'Build: Babel');
  } else {
    await workspacePaths.reduce(
      (promise, workspacePath) =>
        promise.then(() =>
          spinnerAction(babelAction({ ...argv, cwd: workspacePath }), `Build: Babel [${basename(workspacePath)}]`),
        ),
      Promise.resolve(),
    );
  }

  await taskHook(argv, { task: 'build', type: 'post' });
};

export type { BuildProps };
export { buildTask };
