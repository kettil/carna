import { join } from 'path';
import exec from '../../cmd/exec';
import { getFirstExistFile } from '../../helper';
import { Action } from '../../types';

const configs = ['tsconfig.json'];
const buildConfigs = ['tsconfig.build.json'];

type TscProps = {
  mode: 'type-check' | 'type-create';
};

const tsc: Action<TscProps> = async ({ cwd, log }, { mode }) => {
  const configPath = await getFirstExistFile(cwd, mode === 'type-create' ? buildConfigs : configs);

  const cmd = './node_modules/.bin/tsc';
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
  await exec({ cmd, args, cwd, log });
};

export default tsc;
