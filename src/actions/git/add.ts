import exec from '../../lib/cmd/exec';
import { Action } from '../../lib/types';

type Props = {
  files: string[];
};

const gitAdd: Action<Props> = async ({ cwd, log }, { files }) => {
  if (files.length === 0) {
    return;
  }

  log.info('Add files to the staged:');
  await exec({ cmd: 'git', args: ['add', ...files.map((file) => (file === '.' ? '.' : `"${file}"`))], cwd, log });
};

export default gitAdd;
