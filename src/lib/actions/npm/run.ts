import { exec } from '../../cmd/exec';
import { Action } from '../../types';

type Props = {
  script: string;
};

const npmRunAction: Action<Props> = async ({ cwd, log }, { script }) => {
  log.info(`The npm script "${script}" is executed`);
  await exec({ cmd: 'npm', args: ['run', script], cwd, log });
};

export { npmRunAction };
