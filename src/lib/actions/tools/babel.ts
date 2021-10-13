import { join } from 'path';
import { babelCommand, babelExtensions } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getBabelConfigPath } from '../../utils/getBabelConfigPath';
import { BabelActionProps } from '../types';

const babelAction: Action<BabelActionProps> = async (
  { root, cwd, log },
  { watch, skipInitialBuild, spawnKillHandler },
) => {
  const configPath = await getBabelConfigPath([cwd, root]);

  const cmd = join(root, babelCommand);
  const args: string[] = [];

  // options
  args.push('-d', 'build');
  args.push('--config-file', configPath);
  args.push('--extensions', babelExtensions);

  if (watch) {
    args.push('--watch');

    if (skipInitialBuild) {
      args.push('--skip-initial-build');
    }
  }

  // path
  args.push('src');

  log.info('Run babel');
  await exec({ cmd, args, cwd, log, withDirectOutput: watch, spawnKillHandler });
};

export { babelAction };
