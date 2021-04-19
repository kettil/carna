import { join, relative, basename } from 'path';
import exec from '../../cmd/exec';
import { existConfigFile } from '../../helper';
import { Action } from '../../types';

const configs = ['.eslintrc.js', '.eslintrc.cjs', '.eslintrc.yaml', '.eslintrc.yml', '.eslintrc.json', '.eslintrc'];

const ignoreFiles = new Set(['babel.config.js', 'jest.config.js', 'webpack.config.js']);

export const eslintExtensionAll = 'js,ts,tsx';

type EslintProps = {
  write?: boolean;
  files?: string[];
};

const eslint: Action<EslintProps> = async ({ cwd, cfg, log }, { write, files }) => {
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
    args.push('--ext', `"${eslintExtensionAll}"`);
    args.push('.');
  }

  log.info('Run eslint');
  await exec({ cmd, args, cwd, log });
};

export default eslint;
