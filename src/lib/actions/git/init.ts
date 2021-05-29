import { join } from 'path';
import { access } from '../../cmd/access';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';

const gitInitAction: Action = async ({ cwd, log }) => {
  const path = join(cwd, '.git');
  const isExists = await access(path);

  if (!isExists) {
    log.info('Initialize the Git repository');
    await exec({ cmd: 'git', args: ['init'], cwd, log });
  } else {
    log.info('Git repository already exists');
  }
};

export { gitInitAction };
