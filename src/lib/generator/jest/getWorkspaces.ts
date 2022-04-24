import { readFileSync } from 'fs';
import { basename, join, relative, normalize } from 'path';
import { isArray, isObject, isString, uniqueArray } from '@kettil/tools';
import { glob } from 'glob';

const getWorkspaces = (root: string): Record<string, string> => {
  const packagePath = normalize(join(__dirname, relative(__dirname, root), './package.json'));
  const packageData = readFileSync(packagePath, { encoding: 'utf8' });
  const packageJson = JSON.parse(packageData) as unknown;

  if (!isObject(packageJson)) {
    return {};
  }

  const { workspaces } = packageJson;

  if (!isArray(workspaces)) {
    return {};
  }

  const paths = uniqueArray(
    workspaces
      .filter(isString)
      .flatMap((workspace) => glob.sync(`${workspace.replace(/\/+$/u, '')}/`))
      .map((path) => path.replace(/\/$/u, '').replace(/^\./u, '<rootDir>'))
      .sort(),
  );

  return Object.fromEntries(paths.map((path) => [basename(path), path]));
};

export { getWorkspaces };
