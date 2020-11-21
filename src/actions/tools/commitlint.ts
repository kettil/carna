import { join, relative } from 'path';
import exec from '../../lib/cmd/exec';
import { existConfigFile } from '../../lib/helper';
import { Action } from '../../lib/types';

const configs = ['commitlint.config.js', '.commitlintrc.js', '.commitlintrc.json', '.commitlintrc.yml'];

const commitlint: Action = async ({ cwd, cfg, log }) => {
  const hasConfigFile = await existConfigFile(cwd, configs);

  const cmd = './node_modules/.bin/commitlint';
  const args: string[] = [];

  args.push('-E', 'HUSKY_GIT_PARAMS');
  args.push('--color');

  if (!hasConfigFile) {
    args.push('--config', relative(cwd, join(cfg, 'commitlintrc.json')));
  }

  log.info('Run commitlint');
  await exec({ cmd, args, cwd, log });
};

export default commitlint;
