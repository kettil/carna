import { npmPackageLoadAction } from '../actions/npm/packageLoad';
import { babelAction } from '../actions/tools/babel';
import { tscAction } from '../actions/tools/tsc';
import { spinnerAction } from '../cli/spinner';
import { FirstExistFileError } from '../errors/firstExistFileError';
import { Task } from '../types';
import { getBabelConfigPath } from '../utils/getConfigPath';
import { getTypescriptConfigPath } from '../utils/getTypescriptConfigPath';
import { taskHook } from '../utils/taskHook';

type BuildProps = {};

const buildTask: Task<BuildProps> = async (argv) => {
  await taskHook(argv, { task: 'build', type: 'pre' });

  const isPrivate = await npmPackageLoadAction(argv, { key: 'private' });

  if (isPrivate !== true) {
    try {
      await getTypescriptConfigPath(argv.cwd, 'type-create');
      await spinnerAction(tscAction(argv, { mode: 'type-create' }), 'Build: Typescript');
    } catch (error) {
      if (!(error instanceof FirstExistFileError)) {
        throw error;
      }
    }
  }

  try {
    await getBabelConfigPath({ cwd: argv.cwd, root: argv.root });
    await spinnerAction(babelAction(argv), 'Build: Babel');
  } catch (error) {
    if (!(error instanceof FirstExistFileError)) {
      throw error;
    }
  }

  await taskHook(argv, { task: 'build', type: 'post' });
};

export type { BuildProps };
export { buildTask };
