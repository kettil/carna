import { basename, join } from 'path';
import type { Logger } from '../cli/logger';
import { spinnerAction } from '../cli/spinner';
import { access } from '../cmd/access';
import { execReturn } from '../cmd/execReturn';
import type { Task } from '../types';

const runHook = async (cwd: string, log: Logger, project: string, path: string): Promise<void> => {
  const cmd = './node_modules/.bin/babel-node';
  const args: string[] = ['-x', '.js,.ts', '--', path];

  log.debug(`Run ${basename(path)} for test project ${project}`);
  await execReturn({ cmd, args, cwd, log });
};

const testHook: Task<{ project: string; type: 'post' | 'pre' }> = async (argv, { project, type }) => {
  const pathTs = join(argv.cwd, 'tests', project, `${type}.ts`);
  const pathJs = join(argv.cwd, 'tests', project, `${type}.js`);

  const isReadableTs = await access(pathTs, 'readable');

  if (isReadableTs) {
    await spinnerAction(runHook(argv.cwd, argv.log, project, pathTs), `Test: ${project} [${type} hook]`);

    return;
  }

  const isReadableJs = await access(pathJs, 'readable');

  if (isReadableJs) {
    await spinnerAction(runHook(argv.cwd, argv.log, project, pathJs), `Test: ${project} [${type} hook]`);
  }
};

export { testHook };
