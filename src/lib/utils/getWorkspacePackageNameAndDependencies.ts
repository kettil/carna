import { isObject, isString } from '@kettil/tool-lib';
import { npmPackageLoadAction } from '../actions/npm/packageLoad';
import { Action } from '../types';

type WorkspacePackageNameAndDependencies = { name: string; path: string; dependencies: string[] };

const getWorkspacePackageNameAndDependencies: Action<{ workspacePath: string }, WorkspacePackageNameAndDependencies> =
  async (argv, { workspacePath }) => {
    const packageData = await npmPackageLoadAction(argv, { path: workspacePath });

    if (!isObject(packageData)) {
      throw new TypeError('bla');
    }

    const { name, dependencies } = packageData;

    if (!isString(name)) {
      throw new TypeError('The package.json key "name" is undefiend');
    }

    const dependencyNames = isObject(dependencies) ? Object.keys(dependencies) : [];

    return { name, path: workspacePath, dependencies: dependencyNames };
  };

export type { WorkspacePackageNameAndDependencies };
export { getWorkspacePackageNameAndDependencies };
