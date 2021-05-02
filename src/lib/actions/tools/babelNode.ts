// import { join } from 'path';
import exec from '../../cmd/exec';
import { getFirstExistFile } from '../../helper';
import { Action } from '../../types';
import { babelConfigFiles, babelExtensions } from './babel';

type BabelNodeProps = {
  watch: boolean;
  script?: string;
};

const scriptFiles = ['src/index.ts', 'src/index.js'];

const babelNode: Action<BabelNodeProps> = async ({ cwd, log }, { script, watch }) => {
  const configPath = await getFirstExistFile(cwd, babelConfigFiles);

  const cmd = `./node_modules/.bin/babel-${watch ? 'watch' : 'node'}`;
  const args: string[] = [];

  // options
  args.push('--extensions', babelExtensions);

  if (!watch) {
    args.push('--config-file', configPath);
  }

  // script
  args.push(script ?? (await getFirstExistFile(cwd, scriptFiles)));

  log.info('Run babel-node');
  await exec({ cmd, args, cwd, log, withInteraction: true, withDirectOutput: true });
};

export default babelNode;
