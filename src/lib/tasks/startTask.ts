import { constants } from 'os';
import { join } from 'path';
import { delay } from '@kettil/tool-lib';
import { babelScriptFiles } from '../../configs/actionConfigs';
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { babelAction } from '../actions/tools/babel';
import { babelNodeAction } from '../actions/tools/babelNode';
import { BabelNodeActionProps } from '../actions/types';
import { Task } from '../types';
import { createSpawnKillHandler } from '../utils/createSpawnKillHandler';
import { getFirstExistingFile } from '../utils/getFirstExistingFile';
import { getWorkspaceDependencies } from '../utils/getWorkspaceDependencies';
import { taskHook } from '../utils/taskHook';
import { buildBabelTask } from './subTasks/buildBabelTask';

type StartProps = {
  watch?: boolean;
  script?: string;
  buildDependencies?: boolean;
  clearConsole?: boolean;
  pinoPretty?: boolean;
};

const startTask: Task<StartProps> = async (argv, { buildDependencies, clearConsole, pinoPretty, script, watch }) => {
  const scriptPath = await getFirstExistingFile({ cwd: argv.cwd, files: [script, ...babelScriptFiles] });
  const workspacePaths = await npmPackageWorkspacesAction(argv);
  const workspacePath = workspacePaths.find((path) => scriptPath.includes(path));
  const workspaceFilteredPaths = await getWorkspaceDependencies({ argv, workspacePath, workspacePaths });

  const props: BabelNodeActionProps = {
    watch: !!watch,
    scriptPath,
    clearConsole,
    executePath: workspacePath,
    withPinoPretty: pinoPretty,
  };

  await taskHook(argv, { task: 'start', type: 'pre' });

  if (props.watch) {
    const spawnKillHandler = createSpawnKillHandler();
    const promises: Array<Promise<void>> = [];

    if (buildDependencies && workspaceFilteredPaths.length > 0) {
      // prebuild of dependencies
      await workspaceFilteredPaths.reduce(
        (promise, path) => promise.then(buildBabelTask({ argv, path })),
        Promise.resolve(),
      );

      // starts "babel --watch --skip-initial-build" in the context of dependencies
      promises.push(
        ...workspaceFilteredPaths.map<Promise<void>>((path) =>
          babelAction({ ...argv, cwd: path }, { watch: true, skipInitialBuild: true, spawnKillHandler }),
        ),
      );

      // initialization waiting time for babel
      await delay(250);
    }

    await babelNodeAction(argv, { ...props, watchPaths: workspaceFilteredPaths.map((path) => join(path, 'build')) });

    // quits "babel --watch --skip-initial-build" from the dependencies.
    spawnKillHandler.kill(constants.signals.SIGINT);

    await Promise.all(promises);
  } else {
    if (buildDependencies && workspacePaths.length > 0) {
      await workspaceFilteredPaths.reduce(
        (promise, path) => promise.then(buildBabelTask({ argv, path })),
        Promise.resolve(),
      );
    }

    await babelNodeAction(argv, props);
  }

  await taskHook(argv, { task: 'start', type: 'post' });
};

export type { StartProps };
export { startTask };
