import { red } from 'chalk';
import { Arguments, Argv } from 'yargs';
import access from '../cmd/access';
import ExecutableError from '../errors/executableError';
import { exit } from '../helper';
import { PropsGlobal, Task } from '../types';

type CommandBuilder<TaskProps = Record<string, unknown>> = (yargs: Argv<PropsGlobal>) => Argv<PropsGlobal & TaskProps>;
type CommandHandler<TaskProps = Record<string, unknown>> = (argv: Arguments<PropsGlobal & TaskProps>) => void;

const globalOptions = ['cwd', 'tpl', 'cfg', 'log', 'vvv', 'ci'] as const;

const filterOptions = ([key]: [key: string, value: unknown]) =>
  globalOptions.includes(key as typeof globalOptions[number]);

const filterProps = ([key]: [key: string, value: unknown]) =>
  ![...globalOptions, '_', '$0'].includes(key as typeof globalOptions[number]);

const errorHandler = (argv: PropsGlobal, error: unknown): void => {
  if (error instanceof ExecutableError) {
    argv.log.log('');
    argv.log.log(error.entries);
    argv.log.log('');

    exit();
  }

  if (error instanceof Error) {
    argv.log.log('');
    argv.log.log(red(error.message));
    argv.log.log('');
  }

  throw error;
};

export const createHandler = <TaskProps extends Record<string, unknown>>(
  task: Task<TaskProps>,
): CommandHandler<TaskProps> => async (argv) => {
  try {
    const [isReadableCwd, isReadableCfg, isReadableTpl] = await Promise.all([
      access(argv.cwd, 'readable'),
      access(argv.cfg, 'readable'),
      access(argv.tpl, 'readable'),
    ]);

    if (!isReadableCwd) {
      throw new Error(`The folder ${argv.cwd} is not readable`);
    }

    if (!isReadableCfg) {
      throw new Error(`The folder ${argv.cfg} is not readable`);
    }

    if (!isReadableTpl) {
      throw new Error(`The folder ${argv.tpl} is not readable`);
    }

    argv.log.debug(['Paths:', `▸ cwd: ${argv.cwd}`, `▸ cfg: ${argv.cfg}`, `▸ tpl: ${argv.tpl}`, '']);

    const options = Object.fromEntries(Object.entries(argv).filter(filterOptions)) as PropsGlobal;
    const props = Object.fromEntries(Object.entries(argv).filter(filterProps)) as TaskProps;

    await task(options, props);
  } catch (error) {
    errorHandler(argv, error);
  }
};

export const createBuilder = <TaskProps>(
  command: string,
  callback: CommandBuilder<TaskProps>,
): CommandBuilder<TaskProps> => (yargs) =>
  callback(yargs).usage(`Usage: $0 ${command} [options]`).help().version(false)
    .showHelpOnFail(false);
