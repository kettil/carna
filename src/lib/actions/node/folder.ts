import { join } from 'path';
import access from '../../cmd/access';
import mkdir from '../../cmd/mkdir';
import { Action } from '../../types';

type Props = {
  folder: string;
};

const nodeFolder: Action<Props> = async ({ cwd, log }, { folder }) => {
  const path = join(cwd, folder);
  const isExists = await access(path);

  if (!isExists) {
    log.info(`Create the folder ${folder}`);
    await mkdir(path);
  } else {
    log.info(`The folder ${folder} already existed`);
  }
};

export default nodeFolder;
