import { join } from 'path';
import exec from '../../cmd/exec';
import existFiles from '../../cmd/existFiles';
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

export type PrettierProps = {
  write?: boolean;
  extension?: string;
  files?: string[];
};

const prettier: Action<PrettierProps> = async (
  { cwd, cfg, log },
  { write, files, extension = prettierExtensionAll },
) => {
  const configFiles = await existFiles(configs, cwd);

  configFiles.push(join(cfg, 'prettierrc.json'));

  const cmd = './node_modules/.bin/prettier';
  const args: string[] = [];

  args.push('--config', configFiles[0]);

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
