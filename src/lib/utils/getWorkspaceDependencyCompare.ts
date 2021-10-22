import { WorkspacePackageNameAndDependencies } from './getWorkspacePackageNameAndDependencies';

const getWorkspaceDependencyCompare = ({
  workspace,
  workspaces,
  ignores = [workspace.name],
}: {
  workspace: WorkspacePackageNameAndDependencies;
  workspaces: WorkspacePackageNameAndDependencies[];
  ignores?: string[];
}): string[] => {
  const { dependencies } = workspace;

  return workspaces
    .filter((w) => dependencies.includes(w.name))
    .filter((w) => !ignores.includes(w.name))
    .flatMap((w) => [
      w.path,
      ...getWorkspaceDependencyCompare({ workspace: w, workspaces, ignores: [...ignores, w.name] }),
    ]);
};

export { getWorkspaceDependencyCompare };
