import { join } from 'path';
import { access } from '../cmd/access';
import { readdir } from '../cmd/readdir';

const getNodeModulePaths = async (packagePath: string): Promise<readonly string[]> => {
  const nodeModulesPath = join(packagePath, 'node_modules');
  const packagePaths: string[] = [packagePath];

  const isNodeModulesReadable = await access(nodeModulesPath, 'readable');

  if (isNodeModulesReadable) {
    const files = await readdir(nodeModulesPath);

    const paths = await Promise.all(
      files
        .filter((file) => file.isDirectory() && !file.name.startsWith('.'))
        .map(async (folder) => getNodeModulePaths(join(nodeModulesPath, folder.name))),
    );

    packagePaths.push(...paths.flat());
  }

  return packagePaths;
};

export { getNodeModulePaths };
