import { join, relative } from 'path';
import exec from '../../lib/cmd/exec';
import { existConfigFile } from '../../lib/helper';
import { Action } from '../../lib/types';

const configs = [
  '.prettierrc',
  '.prettierrc.json',
  '.prettierrc.yml',
  '.prettierrc.yaml',
  '.prettierrc.toml',
  '.prettierrc.js',
  'prettier.config.js',
];

export const extensionCi = 'json,md,scss,yml,yaml,html';
export const extensionAll = `ts,tsx,js,jsx,${extensionCi}`;

type Props = {
  write?: boolean;
  extension?: string;
  files?: string[];
};

const prettier: Action<Props> = async ({ cwd, cfg, log }, { write, files, extension = extensionAll }) => {
  const hasConfigFile = await existConfigFile(cwd, configs);

  const cmd = './node_modules/.bin/prettier';
  const args: string[] = [];

  if (!hasConfigFile) {
    args.push('--config', relative(cwd, join(cfg, 'prettierrc.json')));
  }

  if (write) {
    args.push('--write');
  } else {
    args.push('--list-different');
  }

  if (files) {
    if (files.length === 0) {
      log.info('No files found for prettier');

      return;
    }

    args.push(...files);
  } else {
    args.push(`"./**/*.{${extension}}"`);
  }

  log.info('Run prettier');
  await exec({ cmd, args, cwd, log });
};

export default prettier;
