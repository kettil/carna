import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  commonHandler,
} from '../cli/yargs';
import licenseTask from '../tasks/licenseTask';

export const command: CommandModuleCommand = 'license';
export const desc: CommandModuleDescribe = 'Run the license check';

export const builder: CommandModuleBuilder = builderDefault(command, (yargs) => yargs);

export const handler: CommandModuleHandler = async (argv) => {
  try {
    await commonHandler(argv, !argv.ci);

    await licenseTask(argv);
  } catch (error) {
    errorHandler(argv, error);
  }
};
