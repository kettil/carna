import { join, relative } from 'path';
import exec from '../../cmd/exec';
import { existConfigFile } from '../../helper';
import { Action } from '../../types';

const configs = [
  '.prettierrc',
  '.prettierrc.json',
  '.prettierrc.yml',
  '.prettierrc.yaml',
  '.prettierrc.toml',
  '.prettierrc.js',
  'prettier.config.js',
];

export const prettierExtensionCi = 'json,md,scss,yml,yaml,html';
export const prettierExtensionAll = `ts,tsx,js,jsx,${prettierExtensionCi}`;

type PrettierProps = {
  write?: boolean;
  extension?: string;
  files?: string[];
};

const prettier: Action<PrettierProps> = async (
  { cwd, cfg, log },
  { write, files, extension = prettierExtensionAll },
) => {
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
