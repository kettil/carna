import { readdir } from 'fs/promises';
import { join } from 'path';
import access from '../../../cmd/access';

const getPackagePaths = async (packagePath: string): Promise<readonly string[]> => {
  const nodeModulesPath = join(packagePath, 'node_modules');
  const packagePaths: string[] = [packagePath];

  const isNodeModulesReadable = await access(nodeModulesPath, 'readable');

  if (isNodeModulesReadable) {
    const files = await readdir(nodeModulesPath, { encoding: 'utf8', withFileTypes: true });

    const promises = files
      .filter((file) => file.isDirectory() && !file.name.startsWith('.'))
      .map((folder) => getPackagePaths(join(nodeModulesPath, folder.name)));

    packagePaths.push(...(await Promise.all(promises)).flat());
  }

  return packagePaths;
};

export default getPackagePaths;
