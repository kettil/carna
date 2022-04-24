import { isObject, isString } from '@kettil/tools';
import { npmPackageLoadAction } from '../actions/npm/packageLoad';
import type { Action } from '../types';

type WorkspacePackageAndDependencies = {
  name: string;
  path: string;
  dependencies: string[];
};

const getWorkspacePackageAndDependencies: Action<{ workspacePath: string }, WorkspacePackageAndDependencies> = async (
  argv,
  { workspacePath },
) => {
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

export type { WorkspacePackageAndDependencies };
export { getWorkspacePackageAndDependencies };
