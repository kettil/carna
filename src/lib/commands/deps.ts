import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  commonHandler,
} from '../cli/yargs';
import depsTask from '../tasks/depsTask';

export const command: CommandModuleCommand = 'deps';
export const desc: CommandModuleDescribe = 'Run the dependency check';

export const builder: CommandModuleBuilder = builderDefault(command, (yargs) => yargs);

export const handler: CommandModuleHandler = async (argv) => {
  try {
    await commonHandler(argv, !argv.ci);

    await depsTask(argv);
  } catch (error) {
    errorHandler(argv, error);
  }
};
