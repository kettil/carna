import { basename, join } from 'path';
import { Logger } from '../../cli/logger';
import access from '../../cmd/access';
import exec from '../../cmd/exec';
import { Task } from '../../types';

const runHook = async (cwd: string, log: Logger, project: string, path: string): Promise<void> => {
  const cmd = './node_modules/.bin/babel-node';
  const args: string[] = ['-x', '.js,.ts', '--', path];

  log.debug(`Run ${basename(path)} for test project ${project}`);
  await exec({ cmd, args, cwd, log });
};

const testHook: Task<{ project: string; type: 'post' | 'pre' }> = async (argv, { project, type }) => {
  const pathTs = join(argv.cwd, 'tests', project, `${type}.ts`);
  const pathJs = join(argv.cwd, 'tests', project, `${type}.js`);

  const isReadableTs = await access(pathTs, 'readable');

  if (isReadableTs) {
    await runHook(argv.cwd, argv.log, project, pathTs);

    return;
  }

  const isReadableJs = await access(pathJs, 'readable');

  if (isReadableJs) {
    await runHook(argv.cwd, argv.log, project, pathJs);
  }
};

export default testHook;
