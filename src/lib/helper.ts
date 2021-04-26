import { join } from 'path';
import access from './cmd/access';

// eslint-disable-next-line import/prefer-default-export
export const existConfigFile = async (cwd: string, files: string[]): Promise<boolean> => {
  const exists = await Promise.all(files.map((file) => access(join(cwd, file))));

  return exists.some((v) => v);
};

export const exit = (code = 1): never => {
  /* eslint-disable-next-line node/no-process-exit, unicorn/no-process-exit */
  process.exit(code);
};

/* eslint-disable-next-line no-control-regex */
export const cleanCliValue = (v: string): string => v.replace(/(\u001B)?\[[0-9]{1,2}m/gu, '');
