import { babelExtensions, babelScriptFiles } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getBabelConfigPath } from '../../utils/getConfigPath';
import { getFirstExistingFile } from '../../utils/getFirstExistingFile';
import { BabelNodeActionProps } from '../types';

const babelNodeAction: Action<BabelNodeActionProps> = async ({ cwd, log }, { script, watch }) => {
  const configPath = await getBabelConfigPath({ cwd });

  const cmd = `./node_modules/.bin/babel-${watch ? 'watch' : 'node'}`;
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
