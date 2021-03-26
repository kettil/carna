import { dummy } from '@kettil/tool-lib';
import ora from 'ora';

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
  stop('fail');

  throw error;
};

export const spinnerAction = <T>(action: Promise<T>, text: string): Promise<T> => {
  start(text);

  return action.then(succeed, fail);
};

export const spinnerBreak = (): (() => void) => {
  if (isSpinning()) {
    stop('stop');

    return () => instance.start();
  }

  return dummy;
};
