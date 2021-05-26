import existFiles from './cmd/existFiles';
import FirstExistFileError from './errors/firstExistFileError';

/* eslint-disable-next-line no-control-regex */
export const cleanCliValue = (v: string): string => v.replace(/(\u001B)?\[[0-9]{1,2}m/gu, '');

export const getFirstExistFile = async (cwd: string, files: string[]): Promise<string> => {
  const checkedFiles = await existFiles(files, cwd);

  if (checkedFiles.length === 0) {
    throw new FirstExistFileError(`None of the following files were found: ${files.join(', ')}`);
  }

  return checkedFiles[0];
};
