import npmPackageLoad from '../actions/npm/packageLoad';
import babel from '../actions/tools/babel';
import tsc from '../actions/tools/tsc';
import webpack from '../actions/tools/webpack';
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

export const command: CommandModuleCommand = 'build';
export const desc: CommandModuleDescribe = 'Run the code quality tools';

const options = { group: `${command}-Options` } as const;

type Props = {
  readonly ci: boolean;
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    ci: { ...options, type: 'boolean', default: ciDefaultValue(), describe: 'Run it in CI mode' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await commonHandler(argv, !argv.ci);

    const isPrivate = await npmPackageLoad(argv, { key: 'private' });

    if (isPrivate !== true) {
      await spinnerAction(tsc(argv, { mode: 'type-create' }), 'Typescript');
    }

    await spinnerAction(babel(argv), 'Babel');
    await spinnerAction(webpack(argv), 'Webpack');
  } catch (error) {
    errorHandler(argv, error);
  }
};
