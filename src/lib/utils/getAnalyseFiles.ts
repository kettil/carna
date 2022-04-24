import { join } from 'path';
import { promisify } from 'util';
import { isString, uniqueArray } from '@kettil/tool-lib';
import { glob } from 'glob';
import { gitLsAction } from '../actions/git/ls';
import { gitStagedAction } from '../actions/git/staged';
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

  const [changedFiles, stagedFiles] = await Promise.all([
    gitLsAction(argv, { mode: 'all' }),
    gitStagedAction(argv, {}),
  ]);

  const changedAndExistFiles = await existFiles(uniqueArray([...changedFiles, ...stagedFiles]), argv.root);

  return cleanAnalyseFiles(changedAndExistFiles);
};

export type { AnalyseFiles };
export { getAnalyseFiles };
