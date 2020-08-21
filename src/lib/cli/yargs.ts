import { CommandModule, Arguments, Argv } from 'yargs';
import ExecutableError from '../errors/executableError';
import { PropsGlobal } from '../types';

export type CommandModuleCommand = string;

export type CommandModuleDescribe = NonNullable<CommandModule<PropsGlobal>['describe']>;

export type CommandModuleBuilder<Props = Record<string, unknown>> = (
  yargs: Argv<PropsGlobal>,
) => Argv<PropsGlobal & Props>;

export type CommandModuleHandler<Props = Record<string, unknown>> = (args: Arguments<PropsGlobal & Props>) => void;

export const builderDefault = <Props>(cmd: string, fn: CommandModuleBuilder<Props>): CommandModuleBuilder<Props> => (
  yargs,
) => fn(yargs).usage(`Usage: $0 ${cmd} [options]`).help().version(false)
  .showHelpOnFail(false);

export const errorHandler = (argv: PropsGlobal, error: unknown): void => {
  if (error instanceof ExecutableError) {
    argv.log.log(error.stdout);

    /* eslint-disable-next-line node/no-process-exit, unicorn/no-process-exit */
    process.exit(1);
  }

  throw error;
};
