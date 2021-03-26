import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
} from '../lib/cli/yargs';
import commit from './git/commit';
import msg, { Props as MessageProps } from './git/msg';
import push from './git/push';

export const command: CommandModuleCommand = 'git <hook>';
export const desc: CommandModuleDescribe = 'Handler for the git hooks';

const mode = ['msg', 'commit', 'push'] as const;
const options = { group: `${command.slice(0, Math.max(0, command.indexOf('<'))).trim()}-Options` } as const;

type Props = {
  readonly edit: MessageProps['edit'] | undefined;
  readonly hook: typeof mode[number];
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.positional('hook', { choices: mode, demandOption: true }).options({
    edit: { ...options, type: 'string', desc: 'Path to the COMMIT_EDITMSG file (only at hook "msg")' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    const { edit } = argv;

    switch (argv.hook) {
      case 'commit':
        await commit(argv);
        break;

      case 'msg':
        if (typeof edit !== 'string' || edit.trim() === '') {
          throw new Error(`Argument "edit" is required at hook "${argv.hook}"`);
        }

        await msg(argv, { edit });
        break;

      case 'push':
        await push(argv);
        break;
      default:
        throw new Error(`The hook "${argv.hook}" is unknown`);
    }
  } catch (error) {
    errorHandler(argv, error);
  }
};
