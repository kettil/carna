import { readFileSync } from 'fs';
import { basename, join, relative, normalize } from 'path';
import { isArray, isObject, uniqueArray } from '@kettil/tool-lib';
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
      .filter((workspace): workspace is string => typeof workspace === 'string')
      .flatMap((workspace) => glob.sync(`${workspace.replace(/\/+$/, '')}/`))
      .map((path) => path.replace(/\/$/, '').replace(/^\./, '<rootDir>'))
      .sort(),
  );

  return Object.fromEntries(paths.map((path) => [basename(path), path]));
};

export { getWorkspaces };
