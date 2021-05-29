import { join } from 'path';
import { commitlintConfigFiles } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getFirstExistingFile } from '../../utils/getFirstExistingFile';
import { CommitlintActionProps } from '../types';

const commitlintAction: Action<CommitlintActionProps> = async ({ cwd, cfg, log }, { edit }) => {
  const configFile = await getFirstExistingFile({
    defaultFile: join(cfg, 'commitlintrc.json'),
    files: commitlintConfigFiles,
    cwd,
  });

  const cmd = './node_modules/.bin/commitlint';
  const args: string[] = [];

  args.push('--color');
  args.push('--edit', edit);
  args.push('--config', configFile);

  log.info('Run commitlint');
  await exec({ cmd, args, cwd, log });
};

export { commitlintAction };
