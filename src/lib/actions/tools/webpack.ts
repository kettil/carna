import exec from '../../cmd/exec';
import { existConfigFile } from '../../helper';
import { Action } from '../../types';

export const webpackConfigList = ['webpack.config.js'];

const webpack: Action = async ({ cwd, log }) => {
  const hasConfigFile = await existConfigFile(cwd, webpackConfigList);

  if (!hasConfigFile) {
    throw new Error(`Webpack config file was not found (${webpackConfigList.join(', ')})`);
  }

  const cmd = './node_modules/.bin/webpack';
  const args: string[] = [];

  log.info('Run Webpack');
  await exec({ cmd, args, cwd, log });
};

export default webpack;
