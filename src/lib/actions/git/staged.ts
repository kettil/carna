import { execReturn } from '../../cmd/execReturn';
import { Action } from '../../types';

const gitStagedAction: Action<Record<string, undefined>, string[]> = async ({ root, log }) => {
  log.info('Get the list of staged files');

  const { stdout } = await execReturn({ cmd: 'git', args: ['diff', '--staged', '--name-only'], cwd: root, log });

  if (stdout.trim() === '') {
    log.debug('No staged files were found');

    return [];
  }

  const files = stdout.trim().split('\n');

  log.info(files.map((file) => `▸ ${file}`));

  return files;
};

export { gitStagedAction };
