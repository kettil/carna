import exec from '../../cmd/exec';
import { getFirstExistFile } from '../../helper';
import { Action } from '../../types';

const babelConfigFiles = ['babel.config.js', 'babel.config.json'];

export const babelExtensions = '.js,.jsx,.ts,.tsx';

export const getBabelConfigPath = async (cwd: string): Promise<string> => getFirstExistFile(cwd, babelConfigFiles);

const babel: Action = async ({ cwd, log }) => {
  const configPath = await getBabelConfigPath(cwd);

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

export default babel;
