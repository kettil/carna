import exec from '../../lib/cmd/exec';
import { existConfigFile } from '../../lib/helper';
import { Action } from '../../lib/types';

const configs = ['babel.config.js', 'babel.config.json'];

const sourceIgnore = ['src/**/*.test.ts', 'src/**/*.test.tsx'];

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
  args.push('--ignore', `"${sourceIgnore.join('","')}"`);

  // path
  args.push('src');

  log.info('Run babel');
  await exec({ cmd, args, cwd, log });
};

export default babel;
