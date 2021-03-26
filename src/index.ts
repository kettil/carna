import gitAdd from './actions/git/add';
import gitCommit from './actions/git/commit';
import gitInit from './actions/git/init';
import gitStaged from './actions/git/staged';
import nodeFile from './actions/node/file';
import nodeFolder from './actions/node/folder';
import nodeTemplate from './actions/node/template';
import npmInit from './actions/npm/init';
import npmInstall from './actions/npm/install';
import commitlint from './actions/tools/commitlint';
import eslint from './actions/tools/eslint';
import prettier from './actions/tools/prettier';

export { handler as build } from './sequences/build';
export { handler as git } from './sequences/git';
export { handler as init } from './sequences/init';
export { handler as lint } from './sequences/lint';

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
