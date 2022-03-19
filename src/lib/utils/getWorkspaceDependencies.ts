import { isString, uniqueArray } from '@kettil/tool-lib';
import type { PropsGlobal } from '../types';
import { getWorkspaceDependencyCompare } from './getWorkspaceDependencyCompare';
import { getWorkspacePackageAndDependencies } from './getWorkspacePackageAndDependencies';

const getWorkspaceDependencies = async ({
  argv,
  workspacePath,
  workspacePaths,
}: {
  argv: PropsGlobal;
  workspacePath?: string;
  workspacePaths: string[];
}): Promise<string[]> => {
  if (!isString(workspacePath)) {
    return [];
  }

  const promises = workspacePaths.map(async (path) =>
    getWorkspacePackageAndDependencies(argv, { workspacePath: path }),
  );

  const workspaces = await Promise.all(promises);
  const workspace = workspaces.find((w) => w.path === workspacePath);

  return workspace ? uniqueArray(getWorkspaceDependencyCompare({ workspace, workspaces })) : [];
};

export { getWorkspaceDependencies };
