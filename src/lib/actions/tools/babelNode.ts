import { join } from 'path';
import { babelCommandNode, babelCommandWatch, babelExtensions } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getBabelConfigPath } from '../../utils/getBabelConfigPath';
import { BabelNodeActionProps } from '../types';

const babelNodeAction: Action<BabelNodeActionProps> = async (
  { root, cwd, log },
  { scriptPath, watch, clearConsole, watchPaths = [], executePath = cwd },
) => {
  const configPath = await getBabelConfigPath([cwd, root]);

  const cmd = join(root, watch ? babelCommandWatch : babelCommandNode);
  const args: string[] = [];

  // options
  args.push('--extensions', babelExtensions);
  args.push('--config-file', configPath);

  if (watch) {
    args.push(...watchPaths.flatMap((path) => ['--watch', path]));

    if (clearConsole) {
      args.push('--clear-console');
    }
  }

  // scriptPath
  args.push(scriptPath);

  log.info(`Run babel-${watch ? 'watch' : 'node'}`);
  await exec({ log, cmd, args, cwd: executePath, withInteraction: true });
};

export { babelNodeAction };
