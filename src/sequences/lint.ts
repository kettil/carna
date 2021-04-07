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
  commonHandler,
} from '../lib/cli/yargs';
import access from '../lib/cmd/access';

export const command: CommandModuleCommand = 'lint';
export const desc: CommandModuleDescribe = 'Run the code quality tools';

const services = ['eslint', 'prettier', 'typescript'] as const;
const options = { group: `${command}-Options` } as const;

const isSelectedService = (value: string | undefined, service: typeof services[number]): boolean =>
  typeof value === 'undefined' || value === service;

type Props = {
  readonly ci: boolean;
  readonly only: typeof services[number] | undefined;
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    ci: { ...options, type: 'boolean', default: ciDefaultValue(), describe: 'Run it in CI mode' },
    only: { ...options, choices: services, describe: 'Run a single code quality tool' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await commonHandler(argv, !argv.ci);

    const hasTypescriptConfig = await access(join(argv.cwd, 'tsconfig.json'));

    if (isSelectedService(argv.only, 'prettier')) {
      await spinnerAction(
        prettier(argv, argv.ci ? { write: false, extension: extensionCi } : { write: true }),
        'Prettier',
      );
    }

    if (isSelectedService(argv.only, 'eslint')) {
      await spinnerAction(eslint(argv, argv.ci ? { write: false } : { write: true }), 'ESLint');
    }

    if (isSelectedService(argv.only, 'typescript')) {
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
