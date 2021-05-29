import { exec } from '../../cmd/exec';
import { Action } from '../../types';

type Props = {
  msg: string;
};

const gitCommitAction: Action<Props> = async ({ cwd, log }, { msg }) => {
  log.info(`Make a commit with the message "${msg}"`);
  await exec({ cmd: 'git', args: ['commit', '-m', `"${msg}"`], cwd, log });
};

export { gitCommitAction };
