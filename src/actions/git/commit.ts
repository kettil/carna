import exec from '../../lib/cmd/exec';
import { Action } from '../../lib/types';

type Props = {
  msg: string;
};

const gitCommit: Action<Props> = async ({ cwd, log }, { msg }) => {
  log.info(`Make a commit with the message "${msg}"`);
  await exec({ cmd: 'git', args: ['commit', '-m', `"${msg}"`], cwd, log });
};

export default gitCommit;
