import { red } from 'chalk';
import { Arguments, Argv } from 'yargs';
import { access } from '../cmd/access';
import { exit } from '../cmd/exit';
import { MessageError } from '../errors/messageError';
import { TableError } from '../errors/tableError';
import { PropsGlobal, Task } from '../types';
import { log } from './logger';
import { table } from './table';

type CommandBuilder<TaskProps = Record<string, unknown>> = (yargs: Argv<PropsGlobal>) => Argv<PropsGlobal & TaskProps>;
type CommandHandler<TaskProps = Record<string, unknown>> = (argv: Arguments<PropsGlobal & TaskProps>) => Promise<void>;

const globalOptions = ['cwd', 'cfg', 'log', 'vvv', 'ci'] as const;

const filterOptions = ([key]: [key: string, value: unknown]) =>
  globalOptions.includes(key as typeof globalOptions[number]);

const filterProps = ([key]: [key: string, value: unknown]) =>
  ![...globalOptions, '_', '$0'].includes(key as typeof globalOptions[number]);

const errorHandler = (msg: string, error: Error): void => {
  if (typeof msg === 'string' && typeof error === 'undefined') {
    log(' ');
    log(msg);
    log(' ');

    exit();
  }

  if (error instanceof TableError) {
    log(' ');
    log(`${red('Error')}: ${error.message}`);
    log(' ');
    log(table(error.list));
    log(' ');

    exit();
  }

  if (error instanceof MessageError) {
    log('');
    log(error.message);
    log('');

    exit();
  }

  if (error instanceof Error) {
    log('');
    log(red(error.message));
    log('');
  }

  throw error;
};

const createHandler =
  <TaskProps extends Record<string, unknown>>(task: Task<TaskProps>): CommandHandler<TaskProps> =>
    async (argv) => {
      const [isReadableCwd, isReadableCfg] = await Promise.all([
        access(argv.cwd, 'readable'),
        access(argv.cfg, 'readable'),
      ]);

      if (!isReadableCwd) {
        throw new Error(`The folder ${argv.cwd} is not readable`);
      }

      if (!isReadableCfg) {
        throw new Error(`The folder ${argv.cfg} is not readable`);
      }

      argv.log.debug(['Paths:', `▸ cwd:  ${argv.cwd}`, `▸ cfg:  ${argv.cfg}`, '']);

      const options = Object.fromEntries(Object.entries(argv).filter(filterOptions)) as PropsGlobal;
      const props = Object.fromEntries(Object.entries(argv).filter(filterProps)) as TaskProps;

      await task(options, props);
    };

const createBuilder =
  <TaskProps>(command: string, callback: CommandBuilder<TaskProps>): CommandBuilder<TaskProps> =>
    (yargs) =>
      callback(yargs).usage(`Usage: $0 ${command} [options]`).help().version(false)
        .showHelpOnFail(false);

export { createBuilder, createHandler, errorHandler };
