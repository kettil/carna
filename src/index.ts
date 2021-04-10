import gitAdd from './lib/actions/git/add';
import gitCommit from './lib/actions/git/commit';
import gitInit from './lib/actions/git/init';
import gitStaged from './lib/actions/git/staged';
import nodeFile from './lib/actions/node/file';
import nodeFolder from './lib/actions/node/folder';
import nodeTemplate from './lib/actions/node/template';
import npmInit from './lib/actions/npm/init';
import npmInstall from './lib/actions/npm/install';
import commitlint from './lib/actions/tools/commitlint';
import eslint from './lib/actions/tools/eslint';
import prettier from './lib/actions/tools/prettier';

export { handler as build } from './lib/commands/build';
export { handler as git } from './lib/commands/git';
export { handler as init } from './lib/commands/init';
export { handler as lint } from './lib/commands/lint';

export const actions = {
  gitAdd,
  gitCommit,
  gitInit,
  gitStaged,
  nodeFile,
  nodeFolder,
  nodeTemplate,
  npmInit,
  npmInstall,
  commitlint,
  eslint,
  prettier,
};
