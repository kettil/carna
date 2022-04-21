import { join } from 'path';
import { promisify } from 'util';
import { isString } from '@kettil/tool-lib';
import { glob } from 'glob';
import { gitLsAction } from '../actions/git/ls';
import { access } from '../cmd/access';
import { existFiles } from '../cmd/existFiles';
import type { Task } from '../types';
import { cleanAnalyseFiles } from './cleanAnalyseFiles';

const globPromise = promisify(glob);

type AnalyseFiles = {
  prettierFiles: string[];
  eslintFiles: string[];
};

const getAnalyseFiles: Task<{ path?: string; all?: boolean; files?: AnalyseFiles }, AnalyseFiles | undefined> = async (
  argv,
  { files, all, path },
) => {
  if (all || files) {
    return files;
  }

  if (isString(path)) {
    // get all files from "path"
    const pathFiles = await globPromise(`${path}/**/*`, { cwd: argv.cwd, absolute: true });

    return cleanAnalyseFiles(pathFiles);
  }

  const hasGitFolder = await access(join(argv.root, '.git'), 'readable');

  if (!hasGitFolder) {
    // project has not a git repo => check all files
    return undefined;
  }

  const changedFiles = await gitLsAction(argv, { mode: 'all' });
  const changedAndExistFiles = await existFiles(changedFiles, argv.root);

  return cleanAnalyseFiles(changedAndExistFiles);
};

export type { AnalyseFiles };
export { getAnalyseFiles };
