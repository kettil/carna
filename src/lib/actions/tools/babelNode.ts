import { join, relative } from 'path';
import { babelCommandNode, babelCommandWatch, babelExtensions } from '../../../configs/actionConfigs';
import { execStdio } from '../../cmd/execStdio';
import type { Action } from '../../types';
import { createSpawnKillHandler } from '../../utils/createSpawnKillHandler';
import { getBabelConfigPath } from '../../utils/getBabelConfigPath';
import type { BabelNodeActionProps } from '../types';
import { pinoPretty } from './pinoPretty';

const babelNodeAction: Action<BabelNodeActionProps> = async (
  { root, cwd, log },
  { scriptPath, watch, clearConsole, watchPaths = [], executePath = cwd, withPinoPretty, pinoIgnoreKeys },
) => {
  const spawnKillHandler = watch ? createSpawnKillHandler({ registerStdin: true }) : undefined;
  const pipe = withPinoPretty === true ? pinoPretty({ log, root, cwd: executePath, pinoIgnoreKeys }) : undefined;
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

  await execStdio({ log, cmd, args, cwd: executePath, spawnKillHandler, envPrefix }, { pipe });
};

export { babelNodeAction };
