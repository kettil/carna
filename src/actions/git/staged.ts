import exec from '../../lib/cmd/exec';
import { Action } from '../../lib/types';

const gitStaged: Action<Record<string, undefined>, string[]> = async ({ cwd, log }) => {
  const { stdout } = await exec({ cmd: 'git', args: ['diff', '--staged', '--name-only'], cwd, log });

  log.info('Return a list of files from the staged');

  if (stdout.trim() === '') {
    log.debug('No files were found in the staged');

    return [];
  }

  const files = stdout.trim().split('\n');

  log.debug(files.map((file) => `▸ ${file}`));

  return files;
};

export default gitStaged;
