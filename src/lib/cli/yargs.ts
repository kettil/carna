import { env } from '@kettil/tool-lib';
import { CommandModule, Arguments, Argv } from 'yargs';
import ExecutableError from '../errors/executableError';
import logo from '../logo';
import { PropsGlobal } from '../types';

export type CommandModuleCommand = string;

export type CommandModuleDescribe = NonNullable<CommandModule<PropsGlobal>['describe']>;

export type CommandModuleBuilder<Props = Record<string, unknown>> = (
  yargs: Argv<PropsGlobal>,
) => Argv<Props & PropsGlobal>;

export type CommandModuleHandler<Props = Record<string, unknown>> = (argv: Arguments<Props & PropsGlobal>) => void;

export const ciDefaultValue = (): boolean => env('CI', '') !== '';

export const builderDefault = <Props>(
  cmd: string,
  callback: CommandModuleBuilder<Props>,
): CommandModuleBuilder<Props> => (yargs) =>
  callback(yargs).usage(`Usage: $0 ${cmd} [options]`).help().version(false)
    .showHelpOnFail(false);

export const commonHandler = async (argv: Arguments<PropsGlobal>, showLogo: boolean): Promise<void> => {
  if (showLogo) {
    await logo();
  }

  argv.log.debug(['Paths:', `▸ cwd: ${argv.cwd}`, `▸ cfg: ${argv.cfg}`, `▸ tpl: ${argv.tpl}`, '']);
};

export const errorHandler = (argv: PropsGlobal, error: unknown, onlyExit?: boolean): void => {
  if (error instanceof ExecutableError) {
    argv.log.log('');
    argv.log.log(error.entries);
    argv.log.log('');

    /* eslint-disable-next-line node/no-process-exit, unicorn/no-process-exit */
    process.exit(1);
  }

  if (onlyExit) {
    /* eslint-disable-next-line node/no-process-exit, unicorn/no-process-exit */
    process.exit(1);
  }

  throw error;
};
