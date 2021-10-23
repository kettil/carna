import { isString, uniqueArray } from '@kettil/tool-lib';
import { PropsGlobal } from '../types';
import { getWorkspaceDependencyCompare } from './getWorkspaceDependencyCompare';
import { getWorkspacePackageNameAndDependencies } from './getWorkspacePackageNameAndDependencies';

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

  const workspaces = await Promise.all(
    workspacePaths.map((path) => getWorkspacePackageNameAndDependencies(argv, { workspacePath: path })),
  );
  const workspace = workspaces.find((w) => w.path === workspacePath);

  return workspace ? uniqueArray(getWorkspaceDependencyCompare({ workspace, workspaces })) : [];
};

export { getWorkspaceDependencies };
