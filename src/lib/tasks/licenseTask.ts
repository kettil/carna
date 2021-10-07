import { basename } from 'path';
import { isArray } from '@kettil/tool-lib';
import { underline } from 'chalk';
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { licensecheckAction } from '../actions/tools/licensecheck';
import { getConfig } from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import { table } from '../cli/table';
import { exit } from '../cmd/exit';
import { LicenseDisabledError } from '../errors/licenseDisabledError';
import { LicenseIncompatibleError } from '../errors/licenseIncompatibleError';
import { Task } from '../types';
import { taskHook } from '../utils/taskHook';

const notice = `the license check(s) is only a suggestion and is ${underline('not')} legal advice`;

type LicenseProps = {};

const licenseTask: Task<LicenseProps> = async (argv) => {
  const configIgnorePackages = await getConfig(argv.root, 'license.ignore.packages');
  const workspacePaths = await npmPackageWorkspacesAction(argv);
  const ignorePackages = isArray(configIgnorePackages)
    ? configIgnorePackages.filter((v): v is string => typeof v === 'string')
    : [];

  await taskHook(argv, { task: 'license', type: 'pre' });

  try {
    await [argv.root, ...workspacePaths].reduce(
      (promise, path) =>
        promise.then(() => {
          const subTitle = path === argv.root ? `(${notice})` : `[${basename(path)}]`;

          return spinnerAction(licensecheckAction(argv, { path, ignorePackages }), `License verification ${subTitle}`);
        }),
      Promise.resolve(),
    );
  } catch (error) {
    if (error instanceof LicenseDisabledError) {
      return;
    }

    if (error instanceof LicenseIncompatibleError) {
      argv.log.log(' ');
      argv.log.log(table(error.list));
      argv.log.log(' ');

      exit();
    }

    throw error;
  }

  await taskHook(argv, { task: 'license', type: 'post' });
};

export type { LicenseProps };
export { licenseTask };
