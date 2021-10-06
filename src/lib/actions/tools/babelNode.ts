import { join } from 'path';
import { babelCommandNode, babelCommandWatch, babelExtensions, babelScriptFiles } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getBabelConfigPath } from '../../utils/getConfigPath';
import { getFirstExistingFile } from '../../utils/getFirstExistingFile';
import { BabelNodeActionProps } from '../types';

const babelNodeAction: Action<BabelNodeActionProps> = async ({ root, cwd, log }, { script, watch }) => {
  const configPath = await getBabelConfigPath({ root, cwd });

  const cmd = join(root, watch ? babelCommandWatch : babelCommandNode);
  const args: string[] = [];

  // options
  args.push('--extensions', babelExtensions);
  args.push('--config-file', configPath);

  // script
  args.push(script ?? (await getFirstExistingFile({ cwd, files: babelScriptFiles })));

  log.info(`Run babel-${watch ? 'watch' : 'node'}`);
  await exec({ cmd, args, cwd, log, withInteraction: true, withDirectOutput: true });
};

export { babelNodeAction };
