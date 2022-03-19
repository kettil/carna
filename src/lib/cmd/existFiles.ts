import { join } from 'path';
import { access } from './access';

const existFile = async (cwd: string, file: string): Promise<string> => {
  const path = join(cwd, file);
  const hasAccess = await access(path, 'readable');

  return hasAccess ? path : '';
};

const existFiles = async (files: string[], cwd = ''): Promise<string[]> => {
  const checkedFiles = await Promise.all(files.map(async (file) => existFile(cwd, file)));

  return checkedFiles.filter((file) => file !== '');
};

export { existFiles };
