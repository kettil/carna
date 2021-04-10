import exec from '../../cmd/exec';
import { existConfigFile } from '../../helper';
import { Action } from '../../types';

const configs = ['babel.config.js', 'babel.config.json'];

const babel: Action = async ({ cwd, log }) => {
  const hasConfigFile = await existConfigFile(cwd, configs);

  if (!hasConfigFile) {
    throw new Error(`Babel config file was not found (${configs.join(', ')})`);
  }

  const cmd = './node_modules/.bin/babel';
  const args: string[] = [];

  // options
  args.push('-d', 'build');
  args.push('--extensions', '.ts,.tsx');

  // path
  args.push('src');

  log.info('Run babel');
  await exec({ cmd, args, cwd, log });
};

export default babel;
