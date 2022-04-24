import { basename } from 'path';
import { isArray, isString } from '@kettil/tools';
import { depcheckAction } from '../../actions/tools/depcheck';
import { getConfig } from '../../cli/config';
import { spinnerAction } from '../../cli/spinner';
import { DependencyError } from '../../errors/dependencyError';
import { DependencyWarn } from '../../errors/dependencyWarn';
import type { Task } from '../../types';

type ManageDepsProps = {
  workspacePaths: string[];
};

const manageDepsTask: Task<ManageDepsProps> = async (argv, { workspacePaths }) => {
  const configIgnorePackages = await getConfig(argv.root, 'deps.ignore.packages');
  const ignorePackages = isArray(configIgnorePackages) ? configIgnorePackages.filter(isString) : [];

  await [argv.root, ...workspacePaths].reduce(
    async (promise, path) =>
      promise.then(async () => {
        try {
          const subTitle = path === argv.root ? '' : `[${basename(path)}]`;

          await spinnerAction(depcheckAction(argv, { path, ignorePackages }), `Dependency verification ${subTitle}`);
        } catch (error: unknown) {
          if (error instanceof DependencyError) {
            argv.log.log(error.list);

            throw error;
          }

          if (!(error instanceof DependencyWarn)) {
            throw error;
          }

          argv.log.log(error.list);
        }
      }),
    Promise.resolve(),
  );
};

export { manageDepsTask };
