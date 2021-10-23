import { constants } from 'os';
import { dummy } from '@kettil/tool-lib';
import ora from 'ora';
import { exit } from '../cmd/exit';
import { SpinnerWarnError } from '../errors/spinnerWarnError';
import { SpawnKillHandler } from '../utils/createSpawnKillHandler';
import { getStdin } from './process';

type StopTypes = 'fail' | 'info' | 'stop' | 'succeed' | 'warn';

const instance = ora({
  color: 'white',
  spinner: 'dots',
});

const isSpinning = (): boolean => instance.isSpinning;

const start = (text: string) => {
  instance.start(text);
};

const stop = (key: StopTypes, text?: string) => {
  if (isSpinning()) {
    instance[key](text);
  }
};

const succeed = <T>(p: T) => {
  stop('succeed');

  return p;
};

const fail = (error: unknown) => {
  if (error instanceof SpinnerWarnError) {
    stop('warn', error.spinnerText);
  } else {
    stop('fail');
  }

  throw error;
};

const spinnerAction = <T>(action: Promise<T>, text: string): Promise<T> => {
  start(text);

  return action.then(succeed, fail);
};

const spinnerWatchAction = <T>(actions: Array<Promise<T>>, spawnKillHandler: SpawnKillHandler): Promise<T[]> => {
  start('Watch-Mode - exit with "q"');

  const stdin = getStdin();

  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();

  stdin.on('data', (key) => {
    // ctrl-c ( end of text )
    if (key.toString() === '\u0003') {
      stdin.setRawMode(false);
      stdin.pause();

      exit();
    }

    if (key.toString() === 'q') {
      stdin.setRawMode(false);
      stdin.pause();

      spawnKillHandler.kill(constants.signals.SIGINT);
    }
  });

  return Promise.all(actions).then(succeed, fail);
};

const spinnerBreak = (): (() => void) => {
  if (isSpinning()) {
    stop('stop');

    return () => instance.start();
  }

  return dummy;
};

export { isSpinning, spinnerAction, spinnerWatchAction, spinnerBreak };
