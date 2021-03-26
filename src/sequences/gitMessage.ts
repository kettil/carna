import commitlint from '../actions/tools/commitlint';
import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
} from '../lib/cli/yargs';

type Props = {
  readonly edit: string;
};

export const command: CommandModuleCommand = 'git:msg';
export const desc: CommandModuleDescribe = 'Handler for the git pre-commit hook';

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    edit: { type: 'string', desc: 'Path to the COMMIT_EDITMSG file', demandOption: true, group: `${command}-Options:` },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await commitlint(argv, { edit: argv.edit });
  } catch (error) {
    errorHandler(argv, error);
  }
};
