import { join, relative } from 'path';
import access from '../../lib/cmd/access';
import exec from '../../lib/cmd/exec';
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

export const extensionCi = 'json,md,scss,yml,html';
export const extensionAll = `ts,tsx,js,jsx,${extensionCi}`;

type Props = {
  write?: boolean;
  extension?: string;
  files?: string[];
};

const prettier: Action<Props> = async ({ cwd, cfg, log }, { write, files, extension = extensionAll }) => {
  const isConfigFileFounds = await Promise.all(configs.map((file) => access(join(cwd, file))));

  const cmd = './node_modules/.bin/prettier';
  const args = [];

  if (!isConfigFileFounds.every((v) => v)) {
    args.push('--config', relative(cwd, join(cfg, 'prettierrc.json')));
  }

  if (write) {
    args.push('--write');
  } else {
    args.push('--list-different');
  }

  if (files) {
    args.push(...files);
  } else {
    args.push(`"./**/*.{${extension}}"`);
  }

  log.info('Run prettier');
  await exec({ cmd, args, cwd, log });
};

export default prettier;
