import { join } from 'path';
import access from './cmd/access';
import existFiles from './cmd/existFiles';

// eslint-disable-next-line import/prefer-default-export
export const existConfigFile = async (cwd: string, files: string[]): Promise<boolean> => {
  const exists = await Promise.all(files.map((file) => access(join(cwd, file))));

  return exists.some((v) => v);
};

/* eslint-disable-next-line no-control-regex */
export const cleanCliValue = (v: string): string => v.replace(/(\u001B)?\[[0-9]{1,2}m/gu, '');

export const getFirstExistFile = async (cwd: string, files: string[]): Promise<string> => {
  const checkedFiles = await existFiles(files, cwd);

  if (checkedFiles.length === 0) {
    throw new Error(`None of the following files were found: ${files.join(', ')}`);
  }

  return join(cwd, checkedFiles[0]);
};
