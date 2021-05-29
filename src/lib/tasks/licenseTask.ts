import { isArray } from '@kettil/tool-lib';
import { underline } from 'chalk';
import { licensecheckAction } from '../actions/tools/licensecheck';
import { getConfig } from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import { table } from '../cli/table';
import { exit } from '../cmd/exit';
import { LicenseDisabledError } from '../errors/licenseDisabledError';
import { LicenseIncompatibleError } from '../errors/licenseIncompatibleError';
import { Task } from '../types';
import { taskHook } from '../utils/taskHook';

const notice = `the check is only a suggestion and is ${underline('not')} legal advice`;

type LicenseProps = {};

const licenseTask: Task<LicenseProps> = async (argv) => {
  try {
    const configIgnorePackages = await getConfig(argv.cwd, 'license.ignore.packages');
    const ignorePackages = isArray(configIgnorePackages)
      ? configIgnorePackages.filter((v): v is string => typeof v === 'string')
      : [];

    await taskHook(argv, { task: 'license', type: 'pre' });
    await spinnerAction(licensecheckAction(argv, ignorePackages), `License verification (${notice})`);
    await taskHook(argv, { task: 'license', type: 'post' });
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
};

export type { LicenseProps };
export { licenseTask };
