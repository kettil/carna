import { join } from 'path';
import access from './cmd/access';

// eslint-disable-next-line import/prefer-default-export
export const existConfigFile = async (cwd: string, files: string[]): Promise<boolean> => {
  const exists = await Promise.all(files.map((file) => access(join(cwd, file))));

  return exists.every((v) => v);
};
