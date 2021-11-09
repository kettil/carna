import { PropsGlobal } from '../types';
import { getWorkspaceDependencies } from './getWorkspaceDependencies';
import { sortPackagesByDependencies } from './sortPackagesByDependencies';

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

  const promises = workspacePaths.map<Promise<[string, string[]]>>(async (path, _, paths) => {
    const dependencyPaths = await getWorkspaceDependencies({
      argv,
      workspacePath: path,
      workspacePaths: paths,
    });

    return [path, dependencyPaths];
  });

  return (await Promise.all(promises)).sort(sortPackagesByDependencies).map(([k]) => k);
};

export { getWorkspacesOrderByDependencies };
