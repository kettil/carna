import { promises, Dirent } from 'fs';

const readdir = async (path: string): Promise<Dirent[]> =>
  promises.readdir(path, { encoding: 'utf8', withFileTypes: true });

export default readdir;
