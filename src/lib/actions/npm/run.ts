import { exec } from '../../cmd/exec';
import { Action } from '../../types';

type Props = {
  script: string;
};

const npmRunAction: Action<Props> = async ({ root, log }, { script }) => {
  log.info(`The npm script "${script}" is executed`);
  await exec({ cmd: 'npm', args: ['run', script], cwd: root, log });
};

export { npmRunAction };
