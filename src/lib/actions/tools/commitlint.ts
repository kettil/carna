import { join } from 'path';
import exec from '../../cmd/exec';
import existFiles from '../../cmd/existFiles';
import { Action } from '../../types';

const configs = ['commitlint.config.js', '.commitlintrc.js', '.commitlintrc.json', '.commitlintrc.yml'];

export type CommitlintProps = {
  edit: string;
};

const commitlint: Action<CommitlintProps> = async ({ cwd, cfg, log }, { edit }) => {
  const configFiles = await existFiles(configs, cwd);

  configFiles.push(join(cfg, 'commitlintrc.json'));

  const cmd = './node_modules/.bin/commitlint';
  const args: string[] = [];

  args.push('--color');
  args.push('--edit', edit);
  args.push('--config', configFiles[0]);

  log.info('Run commitlint');
  await exec({ cmd, args, cwd, log });
};

export default commitlint;
