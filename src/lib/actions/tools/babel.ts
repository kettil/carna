import { babelExtensions } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getBabelConfigPath } from '../../utils/getConfigPath';

const babelAction: Action = async ({ cwd, log }) => {
  const configPath = await getBabelConfigPath({ cwd });

  const cmd = './node_modules/.bin/babel';
  const args: string[] = [];

  // options
  args.push('-d', 'build');
  args.push('--config-file', configPath);
  args.push('--extensions', babelExtensions);

  // path
  args.push('src');

  log.info('Run babel');
  await exec({ cmd, args, cwd, log });
};

export { babelAction };
