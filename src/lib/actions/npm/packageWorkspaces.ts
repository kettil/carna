import { promisify } from 'util';
import { isArray } from '@kettil/tool-lib';
import { glob } from 'glob';
import { Action } from '../../types';
import { npmPackageLoadAction } from './packageLoad';

const globPromise = promisify(glob);

const npmPackageWorkspacesAction: Action<undefined, string[]> = async (argv) => {
  const workspaces = await npmPackageLoadAction(argv, { key: 'workspaces' });

  if (!isArray(workspaces)) {
    return [];
  }

  const paths = await Promise.all(
    workspaces
      .filter((workspace): workspace is string => typeof workspace === 'string')
      .map((workspace) => globPromise(workspace, { cwd: argv.root, absolute: true })),
  );

  return paths.flat();
};

export { npmPackageWorkspacesAction };
