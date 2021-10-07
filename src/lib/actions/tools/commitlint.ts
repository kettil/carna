import { join } from 'path';
import { commitlintCommand, commitlintConfigFiles } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getFirstExistingFile } from '../../utils/getFirstExistingFile';
import { CommitlintActionProps } from '../types';

const commitlintAction: Action<CommitlintActionProps> = async ({ root, cfg, log }, { edit }) => {
  const configFile = await getFirstExistingFile({
    defaultFile: join(cfg, 'commitlintrc.json'),
    files: commitlintConfigFiles,
    cwd: root,
  });

  const cmd = join(root, commitlintCommand);
  const args: string[] = [];

  args.push('--color');
  args.push('--edit', edit);
  args.push('--config', configFile);

  log.info('Run commitlint');
  await exec({ cmd, args, cwd: root, log });
};

export { commitlintAction };