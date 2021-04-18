import { Arguments, Argv } from 'yargs';
import ExecutableError from '../errors/executableError';
import logo from '../logo';
import { PropsGlobal, Task } from '../types';

type CommandBuilder<TaskProps = Record<string, unknown>> = (yargs: Argv<PropsGlobal>) => Argv<PropsGlobal & TaskProps>;
type CommandHandler<TaskProps = Record<string, unknown>> = (argv: Arguments<PropsGlobal & TaskProps>) => void;

const globalOptions = ['cwd', 'tpl', 'cfg', 'log', 'vvv', 'ci'] as const;

const filterOptions = ([key]: [key: string, value: unknown]) =>
  globalOptions.includes(key as typeof globalOptions[number]);

const filterProps = ([key]: [key: string, value: unknown]) =>
  ![...globalOptions, '_', '$0r '].includes(key as typeof globalOptions[number]);

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

export const createHandler = <TaskProps extends Record<string, unknown>>(
  task: Task<TaskProps>,
): CommandHandler<TaskProps> => async (argv) => {
  try {
    if (!argv.ci) {
      await logo();
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
