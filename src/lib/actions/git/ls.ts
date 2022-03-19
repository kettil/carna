import { execReturn } from '../../cmd/execReturn';
import type { Action } from '../../types';

const modes = ['modified', 'others'] as const;

type Mode = typeof modes[number] | 'all';

const gitLsAction: Action<{ mode: Mode }, string[]> = async ({ root, log }, { mode }) => {
  log.info('Get the list of modified or other files');

  const args = ['ls-files', '--exclude-standard'];

  if (mode === 'all') {
    args.push(...modes.map((v) => `--${v}`));
  } else {
    args.push(`--${mode}`);
  }

  const { stdout } = await execReturn({ cmd: 'git', args, cwd: root, log });

  log.info('Return a list of modified or other files');

  if (stdout.trim() === '') {
    log.debug('No modified or other files were found');

    return [];
  }

  const files = stdout.trim().split('\n');

  log.info(files.map((file) => `▸ ${file}`));

  return files;
};

export { gitLsAction };
