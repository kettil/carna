import { basename, join, relative } from 'path';
import { isArray, isObject, uniqueArray } from '@kettil/tool-lib';
import { glob } from 'glob';

const getWorkspaces = (root: string): Record<string, string> => {
  /* eslint-disable-next-line max-len -- see next line */
  /* eslint-disable-next-line @typescript-eslint/no-var-requires, node/global-require, import/no-dynamic-require -- root path is unknown */
  const packageJson = require(`./${join(relative(__dirname, root), './package.json')}`) as unknown;

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
