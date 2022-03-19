import { basename } from 'path';
import { promisify } from 'util';
import { isArray, isString, uniqueArray } from '@kettil/tool-lib';
import { glob } from 'glob';
import { MultipleWorkspacesError } from '../../errors/multipleWorkspacesError';
import type { Action } from '../../types';
import { npmPackageLoadAction } from './packageLoad';

const globPromise = promisify(glob);

const npmPackageWorkspacesAction: Action<undefined, string[]> = async (argv) => {
  const workspaces = await npmPackageLoadAction(argv, { key: 'workspaces' });

  if (!isArray(workspaces)) {
    return [];
  }

  const paths = await Promise.all(
    workspaces.filter(isString).map(async (workspace) => globPromise(workspace, { cwd: argv.root, absolute: true })),
  );

  const workspaceUniques = uniqueArray(paths.flat());
  const workspaceDuplicateNames = uniqueArray(
    workspaceUniques
      .map((workspace) => basename(workspace))
      .filter((name, index, names) => names.indexOf(name) !== index)
      .sort(),
  );

  if (workspaceDuplicateNames.length > 0) {
    throw new MultipleWorkspacesError(`The Workspaces exist more than once: ${workspaceDuplicateNames.join(', ')}`);
  }

  argv.log.info(['Workspaces:', ...workspaceUniques.map((w) => `▸ ${w}`), '']);

  return workspaceUniques;
};

export { npmPackageWorkspacesAction };
