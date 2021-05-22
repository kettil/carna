import { isArray, dummy } from '@kettil/tool-lib';
import chalk from 'chalk';
import { spinnerBreak, isSpinning } from './spinner';

type Type = 'stderr' | 'stdout';

type Level = keyof typeof levels;

type Log = (msg: string[] | string) => void;

export type Logger = Record<Level, Log>;

const levels = {
  log: (msg: string) => msg,
  error: chalk.red,
  info: chalk.green,
  debug: chalk.blue,
};

const maxLevelLength = Object.keys(levels).reduce((p, c) => Math.max(p, c.length), 0);

const getMessageLevel = (level: Level) => levels[level](level.toUpperCase().padEnd(maxLevelLength));

const write = (type: Type, message: string) => {
  process[type].write(`${message.trimEnd()}\n`);
};

const logging =
  (level: string, type: Type): Log =>
    (msg) => {
      const resume = spinnerBreak();
      const messages = isArray(msg) ? msg : msg.replace(/\n$/, '').split('\n');

      messages.forEach((m) => {
        write(type, `[${new Date().toISOString()}] ${level}: ${m}`);
      });

      resume();
    };

export const log: Log = (msg) => {
  const indent = isSpinning() ? '  ' : '';
  const resume = spinnerBreak();
  const messages = isArray(msg) ? msg : msg.trimEnd().split('\n');

  write('stdout', messages.map((v) => indent + v).join('\n'));

  resume();
};

const logger = ({ verbose, vvv }: { verbose: boolean; vvv: boolean }): Logger => {
  const error = logging(getMessageLevel('error'), 'stderr');
  const info = logging(getMessageLevel('info'), 'stdout');
  const debug = logging(getMessageLevel('debug'), 'stdout');

  if (vvv) {
    return { log, error, info, debug };
  }

  if (verbose) {
    return { log, error, info, debug: dummy };
  }

  return { log, error: dummy, info: dummy, debug: dummy };
};

export default logger;
