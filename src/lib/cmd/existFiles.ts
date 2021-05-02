import { join } from 'path';
import access from './access';

const existFile = async (cwd: string, file: string): Promise<string> => {
  const hasAccess = await access(join(cwd, file));

  return hasAccess ? file : '';
};

const existFiles = async (files: string[], cwd = ''): Promise<string[]> => {
  const checkedFiles = await Promise.all(files.map((file) => existFile(cwd, file)));

  return checkedFiles.filter((file) => file !== '');
};

export default existFiles;
