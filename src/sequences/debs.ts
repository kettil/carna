import depcheck from '../actions/tools/depcheck';
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

export const command: CommandModuleCommand = 'debs';
export const desc: CommandModuleDescribe = 'Run the dependency check';

const options = { group: `${command}-Options` } as const;

type Props = {
  ci: boolean;
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    ci: { ...options, type: 'boolean', default: false, describe: 'Run it in CI mode' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    if (argv.ci) {
      await depcheck(argv);
    } else {
      await logo();

      await spinnerAction(depcheck(argv), 'DepCheck');
    }
  } catch (error) {
    errorHandler(argv, error);
  }
};
