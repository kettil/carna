import depcheck from '../actions/tools/depcheck';
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

export const command: CommandModuleCommand = 'debs';
export const desc: CommandModuleDescribe = 'Run the dependency check';

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

    await spinnerAction(depcheck(argv), 'Dependency verification');
  } catch (error) {
    errorHandler(argv, error);
  }
};
