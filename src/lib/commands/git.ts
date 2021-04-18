import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  commonHandler,
} from '../cli/yargs';
import gitTask, { GitProps } from '../tasks/gitTask';

export const command: CommandModuleCommand = 'git <hook>';
export const desc: CommandModuleDescribe = 'Handler for the git hooks';

const mode = ['msg', 'commit', 'push'] as const;
const options = { group: `${command.slice(0, Math.max(0, command.indexOf('<'))).trim()}-Options` } as const;

type Props = GitProps;

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.positional('hook', { choices: mode, demandOption: true }).options({
    edit: { ...options, type: 'string', desc: 'Path to the COMMIT_EDITMSG file (only at hook "msg")' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await commonHandler(argv, false);

    await gitTask(argv, argv);
  } catch (error) {
    errorHandler(argv, error);
  }
};
