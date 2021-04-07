import exec from '../../cmd/exec';
import { Action } from '../../types';

const gitStaged: Action<Record<string, undefined>, string[]> = async ({ cwd, log }) => {
  log.info('Get the list of staged files');

  const { stdout } = await exec({ cmd: 'git', args: ['diff', '--staged', '--name-only'], cwd, log });

  if (stdout.trim() === '') {
    log.debug('No staged files were found');

    return [];
  }

  const files = stdout.trim().split('\n');

  log.info(files.map((file) => `▸ ${file}`));

  return files;
};

export default gitStaged;
