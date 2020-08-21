import { join, relative } from 'path';
import access from '../../lib/cmd/access';
import exec from '../../lib/cmd/exec';
import { Action } from '../../lib/types';

const configs = ['commitlint.config.js', '.commitlintrc.js', '.commitlintrc.json', '.commitlintrc.yml'];

const commitlint: Action = async ({ cwd, cfg, log }) => {
  const isConfigFileFounds = await Promise.all(configs.map((file) => access(join(cwd, file))));

  const cmd = './node_modules/.bin/commitlint';
  const args = ['-E', 'HUSKY_GIT_PARAMS', '--color'];

  if (!isConfigFileFounds.every((v) => v)) {
    args.push('--config', relative(cwd, join(cfg, 'commitlintrc.json')));
  }

  log.info('Run commitlint');
  await exec({ cmd, args, cwd, log });
};

export default commitlint;
