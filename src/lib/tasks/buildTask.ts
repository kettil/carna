import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { babelAction } from '../actions/tools/babel';
import { spinnerWatchAction } from '../cli/spinner';
import { Task } from '../types';
import { createSpawnKillHandler } from '../utils/createSpawnKillHandler';
import { hasDependency } from '../utils/hasDependency';
import { taskHook } from '../utils/taskHook';
import { buildBabelTask } from './subTasks/buildBabelTask';
import { buildTscTask } from './subTasks/buildTscTask';

type BuildProps = {
  watch?: boolean;
};

const buildTask: Task<BuildProps> = async (argv, { watch }) => {
  await taskHook(argv, { task: 'build', type: 'pre' });

  const workspacePaths = await npmPackageWorkspacesAction(argv);
  const hasTypescript = await hasDependency(argv, { dependency: 'typescript', dependencyType: 'devDependencies' });

  const paths = workspacePaths.length > 0 ? workspacePaths : [argv.cwd];

  if (watch) {
    if (workspacePaths.length === 0) {
      throw new TypeError('The watch mode is only available in a monorepo, use "npx carna start -w" instead');
    }

    const spawnKillHandler = createSpawnKillHandler();

    const promises = paths.map<Promise<void>>((path) =>
      babelAction({ ...argv, cwd: path }, { watch: true, spawnKillHandler }),
    );

    await spinnerWatchAction(promises, spawnKillHandler);
  } else {
    if (hasTypescript) {
      await paths.reduce((promise, path) => promise.then(buildTscTask({ argv, path })), Promise.resolve());
    }

    await paths.reduce((promise, path) => promise.then(buildBabelTask({ argv, path })), Promise.resolve());
  }

  await taskHook(argv, { task: 'build', type: 'post' });
};

export type { BuildProps };
export { buildTask };
