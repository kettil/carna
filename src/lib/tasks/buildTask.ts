import { join } from 'path';
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { babelAction } from '../actions/tools/babel';
import { spinnerAction } from '../cli/spinner';
import { copyFile } from '../cmd/copyFile';
import type { Task } from '../types';
import { createSpawnKillHandler } from '../utils/createSpawnKillHandler';
import { getWorkspacesOrderByDependencies } from '../utils/getWorkspacesOrderByDependencies';
import { hasDependency } from '../utils/hasDependency';
import { taskHook } from '../utils/taskHook';
import { buildBabelTask } from './subTasks/buildBabelTask';
import { buildTscTask } from './subTasks/buildTscTask';

type BuildProps = {
  watch?: boolean;
};

const buildTask: Task<BuildProps> = async (argv, { watch }) => {
  const workspacePaths = await npmPackageWorkspacesAction(argv);
  const hasTypescript = await hasDependency(argv, { dependency: 'typescript', dependencyType: 'devDependencies' });

  const paths = workspacePaths.length > 0 ? workspacePaths : [argv.cwd];
  const sortedPaths = await getWorkspacesOrderByDependencies({ argv, workspacePaths: paths });

  await taskHook(argv, { task: 'build', type: 'pre' });

  if (watch) {
    if (workspacePaths.length === 0) {
      throw new TypeError('The watch mode is only available in a monorepo, use "npx carna start -w" instead');
    }

    const spawnKillHandler = createSpawnKillHandler({ registerStdin: true });

    const promises = sortedPaths.map<Promise<void>>(async (path) =>
      babelAction({ ...argv, cwd: path }, { watch: true, spawnKillHandler }),
    );

    await spinnerAction(Promise.all(promises), 'Watch-Mode - exit with "ctrl-c"');
  } else {
    if (hasTypescript) {
      await sortedPaths.reduce(async (promise, path) => promise.then(buildTscTask({ argv, path })), Promise.resolve());
    }

    await sortedPaths.reduce(async (promise, path) => promise.then(buildBabelTask({ argv, path })), Promise.resolve());

    // copy .npmignore to the workspaces
    await Promise.all(
      workspacePaths.map(
        async (workspacePath): Promise<void> =>
          copyFile({ src: join(argv.root, '.npmignore'), dest: join(workspacePath, '.npmignore') }),
      ),
    );
  }

  await taskHook(argv, { task: 'build', type: 'post' });
};

export type { BuildProps };
export { buildTask };
