import { execReturn } from '../../cmd/execReturn';
import { Action } from '../../types';

type Props = {
  files: string[];
};

const gitAddAction: Action<Props> = async ({ root, log }, { files }) => {
  if (files.length === 0) {
    return;
  }

  log.info('Add files to the staged:');
  log.info(files.map((file) => `▸ ${file}`));

  const args = ['add', ...files.map((file) => (file === '.' ? '.' : `"${file}"`))];

  await execReturn({
    cmd: 'git',
    args,
    cwd: root,
    log,
  });
};

export { gitAddAction };
