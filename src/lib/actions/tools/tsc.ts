import { join } from 'path';
import exec from '../../cmd/exec';
import { existConfigFile } from '../../helper';
import { Action } from '../../types';

const configs = ['tsconfig.json'];

type TscProps = {
  mode: 'type-check' | 'type-create';
};

const tsc: Action<TscProps> = async ({ cwd, log }, { mode }) => {
  const hasConfigFile = await existConfigFile(cwd, configs);

  if (!hasConfigFile) {
    throw new Error(`TypeScript config file was not found (${configs.join(', ')})`);
  }

  const cmd = './node_modules/.bin/tsc';
  const args: string[] = [];

  switch (mode) {
    case 'type-check':
      args.push('--outDir', join(cwd, 'build'));
      args.push('--project', join(cwd, 'tsconfig.json'));
      args.push('--noEmit');
      args.push('--isolatedModules', 'false');
      break;

    case 'type-create':
      args.push('--outDir', join(cwd, 'build'));
      args.push('--project', join(cwd, 'tsconfig.build.json'));
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
