import { join } from 'path';
import access from './access';

const filterFile = async (cwd: string, file: string): Promise<string> => {
  const hasAccess = await access(join(cwd, file));

  return hasAccess ? file : '';
};

const existFiles = async (files: string[], cwd: string): Promise<string[]> => {
  const filterFiles = await Promise.all(files.map((file) => filterFile(cwd, file)));

  return filterFiles.filter((file) => file !== '');
};

export default existFiles;
