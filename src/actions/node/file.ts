import { join } from 'path';
import access from '../../lib/cmd/access';
import writeFile from '../../lib/cmd/writeFile';
import { Action } from '../../lib/types';

type Props = {
  file: string;
};

const nodeFile: Action<Props> = async ({ cwd, log }, { file }) => {
  const path = join(cwd, file);
  const isExists = await access(path);

  if (!isExists) {
    log.info(`Create the file ${file}`);
    await writeFile(path, '');
  } else {
    log.info(`The file ${file} already existed`);
  }
};

export default nodeFile;
