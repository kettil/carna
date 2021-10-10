import { join } from 'path';
import { babelCommand, babelExtensions } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getBabelConfigPath } from '../../utils/getConfigPath';
import { BabelActionProps } from '../types';

const babelAction: Action<BabelActionProps> = async ({ root, cwd, log }, { watch, spawnKillHandler }) => {
  const configPath = await getBabelConfigPath({ root, cwd });

  const cmd = join(root, babelCommand);
  const args: string[] = [];

  // options
  args.push('-d', 'build');
  args.push('--config-file', configPath);
  args.push('--extensions', babelExtensions);

  if (watch) {
    args.push('--watch');
  }

  // path
  args.push('src');

  log.info('Run babel');
  await exec({ cmd, args, cwd, log, withDirectOutput: watch, spawnKillHandler });
};

export { babelAction };
