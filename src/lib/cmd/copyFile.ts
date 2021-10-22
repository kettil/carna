import { promises, constants } from 'fs';

const copyFile = async ({ src, dest }: { src: string; dest: string }): Promise<void> =>
  promises.copyFile(src, dest, constants.COPYFILE_FICLONE);

export { copyFile };
