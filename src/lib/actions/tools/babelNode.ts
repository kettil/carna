import { join, relative } from 'path';
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
  const envPrefix: NodeJS.ProcessEnv = {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- env variable
    DOTENV_CONFIG_PATH: join(relative(executePath, root), '.env'),
  };

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
  await exec({ log, cmd, args, cwd: executePath, envPrefix, withInteraction: true });
};

export { babelNodeAction };
