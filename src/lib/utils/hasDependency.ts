import { isObject } from '@kettil/tool-lib';
import { npmPackageLoadAction } from '../actions/npm/packageLoad';
import { PropsGlobal } from '../types';

type Props = {
  dependency: string;
  dependencyType: 'dependencies' | 'devDependencies';
};

const hasDependency = async (argv: PropsGlobal, { dependencyType, dependency }: Props): Promise<boolean> => {
  const dependencies = await npmPackageLoadAction(argv, { key: dependencyType });

  if (!isObject(dependencies)) {
    return false;
  }

  return typeof dependencies[dependency] === 'string';
};

export { hasDependency };