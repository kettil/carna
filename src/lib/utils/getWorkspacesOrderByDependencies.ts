import type { PropsGlobal } from '../types';
import { getWorkspaceDependencies } from './getWorkspaceDependencies';
import { topologicalSortingFactory } from './topologicalSorting';

const getWorkspacesOrderByDependencies = async ({
  argv,
  workspacePaths,
}: {
  argv: PropsGlobal;
  workspacePaths: string[];
}): Promise<string[]> => {
  if (workspacePaths.length <= 1) {
    return workspacePaths;
  }

  const dependencyEdges = await Promise.all(
    workspacePaths.map<Promise<Array<[string, string]>>>(async (path, _, paths) => {
      const dependencyPaths = await getWorkspaceDependencies({
        argv,
        workspacePath: path,
        workspacePaths: paths,
      });

      // "path" is the direct follower of "dependencyPath" (for topological sorting).
      return dependencyPaths.map((dependencyPath) => [dependencyPath, path]);
    }),
  );

  const topologicalSorting = topologicalSortingFactory(workspacePaths);

  dependencyEdges.flat().forEach((edge) => {
    topologicalSorting.addEdge(...edge);
  });

  return topologicalSorting.getSortedNode();
};

export { getWorkspacesOrderByDependencies };
