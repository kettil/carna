import commitlint from '../actions/tools/commitlint';
import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
} from '../lib/cli/yargs';

export const command: CommandModuleCommand = 'git:msg';
export const desc: CommandModuleDescribe = 'Handler for the git pre-commit hook';

export const builder: CommandModuleBuilder = builderDefault(command, (yargs) => yargs);

export const handler: CommandModuleHandler = async (argv) => {
  try {
    await commitlint(argv);
  } catch (error) {
    errorHandler(argv, error);
  }
};
