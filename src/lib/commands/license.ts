import { underline } from 'chalk';
import { table, getBorderCharacters } from 'table';
import license from '../actions/tools/licensecheck';
import { spinnerAction } from '../cli/spinner';
import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  ciDefaultValue,
  commonHandler,
} from '../cli/yargs';
import LicenseDisabledError from '../errors/licenseDisabledError';
import LicenseIncompatibleError from '../errors/licenseIncompatibleError';

const notice = `the check is only a suggestion and is ${underline('not')} legal advice`;

export const command: CommandModuleCommand = 'license';
export const desc: CommandModuleDescribe = 'Run the license check';

const options = { group: `${command}-Options` } as const;

type Props = {
  ci: boolean;
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    ci: { ...options, type: 'boolean', default: ciDefaultValue(), describe: 'Run it in CI mode' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await commonHandler(argv, !argv.ci);

    await spinnerAction(license(argv), `License verification (${notice})`);
  } catch (error) {
    if (error instanceof LicenseDisabledError) {
      return;
    }

    if (error instanceof LicenseIncompatibleError) {
      argv.log.log(' ');
      argv.log.log(table(error.list, { border: getBorderCharacters('norc') }));
      argv.log.log(' ');

      errorHandler(argv, error, true);

      return;
    }

    errorHandler(argv, error);
  }
};
