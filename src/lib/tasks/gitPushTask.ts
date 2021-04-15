import { join } from 'path';
import eslint from '../actions/tools/eslint';
import prettier, { prettierExtensionCi } from '../actions/tools/prettier';
import tsc from '../actions/tools/tsc';
import access from '../cmd/access';
import { Task } from '../types';

const gitPushTask: Task = async (argv) => {
  const hasTypescriptConfig = await access(join(argv.cwd, 'tsconfig.json'), 'readable');

  await prettier(argv, { write: false, extension: prettierExtensionCi });
  await eslint(argv, { write: false });

  if (hasTypescriptConfig) {
    await tsc(argv, { mode: 'type-check' });
  }
};

export default gitPushTask;
