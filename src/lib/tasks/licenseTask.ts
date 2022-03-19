import { basename } from 'path';
import { isObject } from '@kettil/tool-lib';
import { underline } from 'chalk';
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { licensecheckAction } from '../actions/tools/licensecheckAction';
import { getConfig } from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import { table } from '../cli/table';
import { exit } from '../cmd/exit';
import { LicenseDisabledError } from '../errors/licenseDisabledError';
import { LicenseIncompatibleError } from '../errors/licenseIncompatibleError';
import type { Task } from '../types';
import { taskHook } from '../utils/taskHook';
import { getLicenseConfigs } from './license/getLicenseConfigs';

const notice = `the license check(s) is only a suggestion and is ${underline('not')} legal advice`;

type LicenseProps = {};

const licenseTask: Task<LicenseProps> = async (argv) => {
  const workspacePaths = await npmPackageWorkspacesAction(argv);
  const config = await getConfig(argv.root, 'license');
  const licenseConfig = getLicenseConfigs(isObject(config) ? config : {});

  await taskHook(argv, { task: 'license', type: 'pre' });

  try {
    await [argv.root, ...workspacePaths].reduce(
      async (promise, path) =>
        promise.then(async () => {
          const subTitle = path === argv.root ? `(${notice})` : `[${basename(path)}]`;

          return spinnerAction(licensecheckAction(argv, { path, licenseConfig }), `License verification ${subTitle}`);
        }),
      Promise.resolve(),
    );
  } catch (error: unknown) {
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
