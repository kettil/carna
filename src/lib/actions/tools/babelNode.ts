import { join } from 'path';
import { babelCommandNode, babelCommandWatch, babelExtensions } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getBabelConfigPath } from '../../utils/getBabelConfigPath';
import { BabelNodeActionProps } from '../types';

const babelNodeAction: Action<BabelNodeActionProps> = async (
  { root, cwd, log },
  { script, watch, watchPaths = [] },
) => {
  const configPath = await getBabelConfigPath([cwd, root]);

  const cmd = join(root, watch ? babelCommandWatch : babelCommandNode);
  const args: string[] = [];

  // options
  args.push('--extensions', babelExtensions);
  args.push('--config-file', configPath);

  if (watch) {
    args.push(...watchPaths.flatMap((path) => ['--watch', path]));
  }

  // script
  args.push(script);

  log.info(`Run babel-${watch ? 'watch' : 'node'}`);
  await exec({ cmd, args, cwd, log, withInteraction: true });
};

export { babelNodeAction };
