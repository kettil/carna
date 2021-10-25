import { join } from 'path';
import { babelCommand, babelExtensions } from '../../../configs/actionConfigs';
import { ExecOptions } from '../../cmd/execA';
import { execLog } from '../../cmd/execLog';
import { execReturn } from '../../cmd/execReturn';
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

  const execOptions: ExecOptions = { cmd, args, cwd, log, spawnKillHandler };

  if (watch) {
    await execLog(execOptions);
  } else {
    await execReturn(execOptions);
  }
};

export { babelAction };
