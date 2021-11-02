import { join, basename } from 'path';
import { eslintCommand, eslintConfigFiles, eslintExtensions, eslintIgnoreFiles } from '../../../configs/actionConfigs';
import { execReturn } from '../../cmd/execReturn';
import { existFiles } from '../../cmd/existFiles';
import { Action } from '../../types';
import { EslintActionProps } from '../types';

const eslintAction: Action<EslintActionProps> = async ({ root, cfg, log }, { write, files }) => {
  const configFiles = await existFiles(eslintConfigFiles, root);

  configFiles.push(join(cfg, 'eslintrc.json'));

  const cmd = join(root, eslintCommand);
  const args: string[] = [];

  args.push('--color');
  args.push('--max-warnings', '0');
  args.push('--config', configFiles[0]);

  if (write) {
    args.push('--fix');
  } else {
    args.push('--format', 'stylish');
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
  await execReturn({ cmd, args, cwd: root, log });
};

export { eslintAction };
