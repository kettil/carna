import { join } from 'path';
import { typescriptCommand } from '../../../configs/actionConfigs';
import { execReturn } from '../../cmd/execReturn';
import type { Action } from '../../types';
import { getTypescriptConfigPath } from '../../utils/getTypescriptConfigPath';
import type { TscActionProps } from '../types';

const tscAction: Action<TscActionProps> = async ({ root, cwd, log }, { mode }) => {
  const configPath = await getTypescriptConfigPath(cwd, mode);

  const cmd = join(root, typescriptCommand);
  const args: string[] = [];

  switch (mode) {
    case 'type-check':
      args.push('--outDir', join(cwd, 'build'));
      args.push('--project', configPath);
      args.push('--noEmit');
      args.push('--isolatedModules', 'false');
      break;

    case 'type-create':
      args.push('--outDir', join(cwd, 'build'));
      args.push('--project', configPath);
      args.push('--noEmit', 'false');
      args.push('--emitDeclarationOnly');
      break;
    default:
      throw new Error(`Mode is unknown: ${String(mode)}`);
  }

  log.info('Run TypeScript');
  await execReturn({ cmd, args, cwd, log });
};

export { tscAction };
