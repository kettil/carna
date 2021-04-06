import { join, relative, basename } from 'path';
import exec from '../../lib/cmd/exec';
import { existConfigFile } from '../../lib/helper';
import { Action } from '../../lib/types';

const configs = ['.eslintrc.js', '.eslintrc.cjs', '.eslintrc.yaml', '.eslintrc.yml', '.eslintrc.json', '.eslintrc'];

const ignoreFiles = new Set(['babel.config.js', 'jest.config.js', 'webpack.config.js']);

export const extensionAll = 'js,ts,tsx';

type Props = {
  write?: boolean;
  files?: string[];
};

const eslint: Action<Props> = async ({ cwd, cfg, log }, { write, files }) => {
  const hasConfigFile = await existConfigFile(cwd, configs);

  const cmd = './node_modules/.bin/eslint';
  const args: string[] = ['--color', '--max-warnings', '0'];

  if (!hasConfigFile) {
    args.push('--config', relative(cwd, join(cfg, 'eslintrc.json')));
  }

  if (write) {
    args.push('--fix');
  } else {
    args.push('--format', 'codeframe');
  }

  if (files) {
    const filteredFiles = files.filter((file) => !ignoreFiles.has(basename(file)));

    if (filteredFiles.length === 0) {
      log.info('No files found for eslint');

      return;
    }

    args.push(...filteredFiles);
  } else {
    args.push('--ext', `"${extensionAll}"`);
    args.push('.');
  }

  log.info('Run eslint');
  await exec({ cmd, args, cwd, log });
};

export default eslint;
