import { join } from 'path';
import { prettierCommand, prettierConfigFiles, prettierExtensions } from '../../../configs/actionConfigs';
import { execReturn } from '../../cmd/execReturn';
import { existFiles } from '../../cmd/existFiles';
import { Action } from '../../types';
import { PrettierActionProps } from '../types';

const prettierAction: Action<PrettierActionProps> = async (
  { root, cfg, log },
  { write, files, extension = prettierExtensions },
) => {
  const configFiles = await existFiles(prettierConfigFiles, root);

  configFiles.push(join(cfg, 'prettierrc.json'));

  const cmd = join(root, prettierCommand);
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
  await execReturn({ cmd, args, cwd: root, log });
};

export { prettierAction };
