import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  commonHandler,
} from '../cli/yargs';
import buildTask from '../tasks/buildTask';

export const command: CommandModuleCommand = 'build';
export const desc: CommandModuleDescribe = 'Run the code quality tools';

export const builder: CommandModuleBuilder = builderDefault(command, (yargs) => yargs);

export const handler: CommandModuleHandler = async (argv) => {
  try {
    await commonHandler(argv, !argv.ci);

    await buildTask(argv);
  } catch (error) {
    errorHandler(argv, error);
  }
};
