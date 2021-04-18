import { underline } from 'chalk';
import { getBorderCharacters, table } from 'table';
import license from '../actions/tools/licensecheck';
import { spinnerAction } from '../cli/spinner';
import { errorHandler } from '../cli/yargs';
import LicenseDisabledError from '../errors/licenseDisabledError';
import LicenseIncompatibleError from '../errors/licenseIncompatibleError';
import { Task } from '../types';
import npmHookTask from './subTasks/npmHookTask';

const notice = `the check is only a suggestion and is ${underline('not')} legal advice`;

const licenseTask: Task = async (argv) => {
  try {
    await npmHookTask(argv, { task: 'license', type: 'pre' });
    await spinnerAction(license(argv), `License verification (${notice})`);
    await npmHookTask(argv, { task: 'license', type: 'post' });
  } catch (error) {
    if (error instanceof LicenseDisabledError) {
      return;
    }

    if (error instanceof LicenseIncompatibleError) {
      argv.log.log(' ');
      argv.log.log(table(error.list, { border: getBorderCharacters('norc') }));
      argv.log.log(' ');

      errorHandler(argv, error, true);
    }

    throw error;
  }
};

export default licenseTask;
