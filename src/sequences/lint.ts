import eslint from '../actions/tools/eslint';
import prettier, { extensionCi } from '../actions/tools/prettier';
import { spinnerAction } from '../lib/cli/spinner';
import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
} from '../lib/cli/yargs';
import logo from '../lib/logo';

export const command: CommandModuleCommand = 'lint';
export const desc: CommandModuleDescribe = 'Run the code quality tools';

const services = ['eslint', 'prettier'] as const;
const options = { group: `${command}-Options` } as const;

type Props = {
  ci: boolean;
  only: typeof services[number] | undefined;
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    ci: { ...options, type: 'boolean', default: false, describe: 'Run it in CI mode' },
    only: { ...options, choices: services, implies: 'ci', describe: 'Run a single code quality tool' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    if (argv.ci) {
      if (typeof argv.only === 'undefined' || argv.only === 'prettier') {
        await prettier(argv, { write: false, extension: extensionCi });
      }

      if (typeof argv.only === 'undefined' || argv.only === 'eslint') {
        await eslint(argv, { write: false });
      }
    } else {
      await logo();

      await spinnerAction(prettier(argv, { write: true }), 'Prettier');
      await spinnerAction(eslint(argv, { write: true }), 'Eslint');
    }
  } catch (error) {
    errorHandler(argv, error);
  }
};
