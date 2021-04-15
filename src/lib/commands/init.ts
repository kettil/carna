import { join } from 'path';
import {
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  CommandModuleBuilder,
  errorHandler,
  commonHandler,
} from '../cli/yargs';
import access from '../cmd/access';
import initTask, { InitProps } from '../tasks/initTask';

export const command: CommandModuleCommand = 'init';
export const desc: CommandModuleDescribe = 'Initializes the project';

const args = { type: 'boolean', default: false, group: `${command}-Options:` } as const;

export const builder: CommandModuleBuilder<InitProps> = builderDefault(command, (yargs) =>
  yargs.options({
    package: { ...args, alias: 'p', desc: 'Project is created as a package' },
    cli: { ...args, alias: 'c', implies: 'package', desc: 'Extends the package with CLI features' },
    github: { type: 'string', desc: 'Github username', group: `${command}-Options:` },

    // conflict with cli
    // react: { ...args, alias: 'r', default: undefined, desc: 'React will be installed', },

    noCommit: { ...args, desc: 'No initial commit is executed at the end' },
  }),
);

export const handler: CommandModuleHandler<InitProps> = async (argv) => {
  try {
    await commonHandler(argv, true);

    const hasPackage = await access(join(argv.cwd, 'package.json'));

    if (hasPackage) {
      throw new Error('The project is already initialized');
    }

    await initTask(argv, argv);
  } catch (error) {
    errorHandler(argv, error);
  }
};
