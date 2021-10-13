import { exec } from '../../cmd/exec';
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

  await exec({ cmd: 'git', args: ['add', ...files.map((file) => (file === '.' ? '.' : `"${file}"`))], cwd: root, log });
};

export { gitAddAction };
