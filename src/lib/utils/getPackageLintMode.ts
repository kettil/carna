import { npmPackageLoadAction } from '../actions/npm/packageLoad';
import type { PackageLintActionProps } from '../actions/tools/packageLint';
import type { PropsGlobal } from '../types';

const getPackageLintMode = async ({
  argv,
  path,
  workspacePaths,
}: {
  argv: PropsGlobal;
  path: string;
  workspacePaths: string[];
}): Promise<PackageLintActionProps['mode']> => {
  if (workspacePaths.length > 0 && path === argv.root) {
    return 'monorepo';
  }

  const packageJsonKeyBin = await npmPackageLoadAction(argv, { path, key: 'bin' });

  if (typeof packageJsonKeyBin !== 'undefined') {
    return 'cli';
  }

  const packageJsonKeyPrivate = await npmPackageLoadAction(argv, { path, key: 'private' });

  if (packageJsonKeyPrivate === true) {
    return 'app';
  }

  return 'lib';
};

export { getPackageLintMode };
