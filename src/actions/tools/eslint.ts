import { join, relative } from 'path';
import access from '../../lib/cmd/access';
import exec from '../../lib/cmd/exec';
import { Action } from '../../lib/types';

const configs = ['.eslintrc.js', '.eslintrc.cjs', '.eslintrc.yaml', '.eslintrc.yml', '.eslintrc.json', '.eslintrc'];

export const extensionAll = 'js,ts,tsx';

type Props = {
  write?: boolean;
  files?: string[];
};

const eslint: Action<Props> = async ({ cwd, cfg, log }, { write, files }) => {
  const isConfigFileFounds = await Promise.all(configs.map((file) => access(join(cwd, file))));

  const cmd = './node_modules/.bin/eslint';
  const args = ['--color'];

  if (!isConfigFileFounds.every((v) => v)) {
    args.push('--config', relative(cwd, join(cfg, 'eslintrc.json')));
  }

  if (write) {
    args.push('--fix');
  }

  if (files) {
    args.push(...files);
  } else {
    args.push('--ext', `"${extensionAll}"`, '.');
  }

  log.info('Run eslint');
  await exec({ cmd, args, cwd, log });
};

export default eslint;
