import { join, basename } from 'path';
import { eslintConfigFiles, eslintExtensions, eslintIgnoreFiles } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { existFiles } from '../../cmd/existFiles';
import { Action } from '../../types';
import { EslintActionProps } from '../types';

const eslintAction: Action<EslintActionProps> = async ({ cwd, cfg, log }, { write, files }) => {
  const configFiles = await existFiles(eslintConfigFiles, cwd);

  configFiles.push(join(cfg, 'eslintrc.json'));

  const cmd = './node_modules/.bin/eslint';
  const args: string[] = [];

  args.push('--color');
  args.push('--max-warnings', '0');
  args.push('--config', configFiles[0]);

  if (write) {
    args.push('--fix');
  } else {
    args.push('--format', 'codeframe');
  }

  if (files) {
    const filteredFiles = files.filter((file) => !eslintIgnoreFiles.has(basename(file)));

    if (filteredFiles.length === 0) {
      log.info('No files found for eslint');

      return;
    }

    args.push(...filteredFiles);
  } else {
    args.push('--ext', `"${eslintExtensions}"`);
    args.push('.');
  }

  log.info('Run eslint');
  await exec({ cmd, args, cwd, log });
};

export { eslintAction };
