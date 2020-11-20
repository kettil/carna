import { join } from 'path';
import exec from '../../lib/cmd/exec';
import { existConfigFile } from '../../lib/helper';
import { Action } from '../../lib/types';

const configs = ['tsconfig.json'];

type Props = {
  mode: 'type-check' | 'type-create';
};

const tsc: Action<Props> = async ({ cwd, log, cfg, vvv }, { mode }) => {
  const hasConfigFile = await existConfigFile(cwd, configs);

  if (!hasConfigFile) {
    throw new Error(`TypeScript config file was not found (${configs.join(', ')})`);
  }

  const cmd = './node_modules/.bin/tsc';
  const args: string[] = [];

  args.push('--outDir', join(cwd, 'build'));

  switch (mode) {
    case 'type-check':
      args.push('--noEmit');
      break;

    case 'type-create':
      args.push('--project', join(cfg, 'typescriptrc.build.json'));
      args.push('--noEmit', 'false');
      args.push('--emitDeclarationOnly');
      break;
    default:
      throw new Error(`Mode is unknown: ${String(mode)}`);
  }

  if (vvv) {
    await exec({ cmd, args: [...args, '--showConfig'], cwd, log });
  }

  log.info('Run TypeScript');
  await exec({ cmd, args, cwd, log });
};

export default tsc;
