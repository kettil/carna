import { join } from 'path';
import eslint from '../actions/tools/eslint';
import prettier, { extensionCi } from '../actions/tools/prettier';
import tsc from '../actions/tools/tsc';
import { spinnerAction } from '../lib/cli/spinner';
import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  ciDefaultValue,
} from '../lib/cli/yargs';
import access from '../lib/cmd/access';
import logo from '../lib/logo';

export const command: CommandModuleCommand = 'lint';
export const desc: CommandModuleDescribe = 'Run the code quality tools';

const services = ['eslint', 'prettier', 'typescript'] as const;
const options = { group: `${command}-Options` } as const;

type Props = {
  readonly ci: boolean;
  readonly only: typeof services[number] | undefined;
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    ci: { ...options, type: 'boolean', default: ciDefaultValue(), describe: 'Run it in CI mode' },
    only: { ...options, choices: services, implies: 'ci', describe: 'Run a single code quality tool' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    const hasTypescriptConfig = await access(join(argv.cwd, 'tsconfig.json'));

    if (argv.ci) {
      if (typeof argv.only === 'undefined' || argv.only === 'prettier') {
        await prettier(argv, { write: false, extension: extensionCi });
      }

      if (typeof argv.only === 'undefined' || argv.only === 'eslint') {
        await eslint(argv, { write: false });
      }

      if (typeof argv.only === 'undefined' || argv.only === 'typescript') {
        if (hasTypescriptConfig) {
          await tsc(argv, { mode: 'type-check' });
        } else {
          argv.log.info('Typing check is skipped (tsconfig.json was not found) ');
        }
      }
    } else {
      await logo();

      argv.log.debug(['Paths:', `▸ cwd: ${argv.cwd}`, `▸ cfg: ${argv.cfg}`, `▸ tpl: ${argv.tpl}`, '']);

      await spinnerAction(prettier(argv, { write: true }), 'Prettier');
      await spinnerAction(eslint(argv, { write: true }), 'Eslint');

      if (hasTypescriptConfig) {
        await spinnerAction(tsc(argv, { mode: 'type-check' }), 'Typescript');
      } else {
        argv.log.info('Typing check is skipped (tsconfig.json was not found) ');
      }
    }
  } catch (error) {
    errorHandler(argv, error);
  }
};
