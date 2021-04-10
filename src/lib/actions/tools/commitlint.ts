import { join, relative } from 'path';
import exec from '../../cmd/exec';
import { existConfigFile } from '../../helper';
import { Action } from '../../types';

const configs = ['commitlint.config.js', '.commitlintrc.js', '.commitlintrc.json', '.commitlintrc.yml'];

export type Props = {
  edit: string;
};

const commitlint: Action<Props> = async ({ cwd, cfg, log }, { edit }) => {
  const hasConfigFile = await existConfigFile(cwd, configs);

  const cmd = './node_modules/.bin/commitlint';
  const args: string[] = [];

  args.push('--edit', edit);
  args.push('--color');

  if (!hasConfigFile) {
    args.push('--config', relative(cwd, join(cfg, 'commitlintrc.json')));
  }

  log.info('Run commitlint');
  await exec({ cmd, args, cwd, log });
};

export default commitlint;
