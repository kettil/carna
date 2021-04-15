import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  commonHandler,
} from '../cli/yargs';
import gitCommitTask from '../tasks/gitCommitTask';
import gitMessageTask, { GitMessageProps } from '../tasks/gitMessageTask';
import gitPushTask from '../tasks/gitPushTask';

export const command: CommandModuleCommand = 'git <hook>';
export const desc: CommandModuleDescribe = 'Handler for the git hooks';

const mode = ['msg', 'commit', 'push'] as const;
const options = { group: `${command.slice(0, Math.max(0, command.indexOf('<'))).trim()}-Options` } as const;

type Props = {
  readonly edit: GitMessageProps['edit'] | undefined;
  readonly hook: typeof mode[number];
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.positional('hook', { choices: mode, demandOption: true }).options({
    edit: { ...options, type: 'string', desc: 'Path to the COMMIT_EDITMSG file (only at hook "msg")' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    const { edit, hook } = argv;

    await commonHandler(argv, false);

    switch (hook) {
      case 'commit':
        await gitCommitTask(argv);
        break;

      case 'msg':
        if (typeof edit !== 'string' || edit.trim() === '') {
          throw new Error(`Argument "edit" is required at hook "${hook}"`);
        }

        await gitMessageTask(argv, { edit });
        break;

      case 'push':
        await gitPushTask(argv);
        break;
      default:
        throw new Error(`The hook "${hook}" is unknown`);
    }
  } catch (error) {
    errorHandler(argv, error);
  }
};
