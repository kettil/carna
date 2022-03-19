import { join } from 'path';
import { babelCommand, babelExtensions } from '../../../configs/actionConfigs';
import type { ExecOptions } from '../../cmd/exec';
import { execLog } from '../../cmd/execLog';
import { execReturn } from '../../cmd/execReturn';
import type { Action } from '../../types';
import { getBabelConfigPath } from '../../utils/getBabelConfigPath';
import type { BabelActionProps } from '../types';

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

  const execOptions: ExecOptions = { cmd, args, cwd, log, spawnKillHandler };

  await (watch ? execLog(execOptions) : execReturn(execOptions));
};

export { babelAction };
