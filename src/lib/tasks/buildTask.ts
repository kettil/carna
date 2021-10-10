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

  const paths = workspacePaths.length > 0 ? workspacePaths : [argv.cwd];

  if (hasTypescript) {
    await paths.reduce(
      (promise, path) =>
        promise.then(async () => {
          const isPrivate = await npmPackageLoadAction(argv, { key: 'private', path });
          const subTitle = path === argv.cwd ? '' : `[${basename(path)}]`;

          if (isPrivate === true) {
            return Promise.resolve();
          }

          return spinnerAction(
            tscAction({ ...argv, cwd: path }, { mode: 'type-create' }),
            `Build: Typescript ${subTitle}`,
          );
        }),
      Promise.resolve(),
    );
  }

  await paths.reduce(
    (promise, path) =>
      promise.then(async () => {
        const subTitle = path === argv.cwd ? '' : `[${basename(path)}]`;

        return spinnerAction(babelAction({ ...argv, cwd: path }), `Build: Babel ${subTitle}`);
      }),
    Promise.resolve(),
  );

  await taskHook(argv, { task: 'build', type: 'post' });
};

export type { BuildProps };
export { buildTask };
