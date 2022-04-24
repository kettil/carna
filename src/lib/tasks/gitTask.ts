import { join } from 'path';
import { gitAddAction } from '../actions/git/add';
import { gitLsAction } from '../actions/git/ls';
import { gitStagedAction } from '../actions/git/staged';
import { commitlintAction } from '../actions/tools/commitlint';
import type { CommitlintActionProps } from '../actions/types';
import { existFiles } from '../cmd/existFiles';
import type { Task } from '../types';
import { cleanAnalyseFiles } from '../utils/cleanAnalyseFiles';
import { taskHook } from '../utils/taskHook';
import { analysePreServices, analyseSuffixServices, analyseTask } from './analyseTask';
import { depsTask } from './depsTask';
import { licenseTask } from './licenseTask';
import { manageTask } from './manageTask';
import { testTask } from './testTask';

const hooks = ['msg', 'commit'] as const;

type GitProps = {
  edit?: CommitlintActionProps['edit'];
  hook: typeof hooks[number];
};

const gitTask: Task<GitProps> = async (argv, { edit, hook }) => {
  await taskHook(argv, { task: 'git', type: 'pre' });

  const stagedFiles = await gitStagedAction(argv, {});

  const files = await existFiles(stagedFiles, argv.cwd);
  const { eslintFiles, mergedFiles, prettierFiles } = cleanAnalyseFiles(files);
  const changedRelativeFiles = await gitLsAction(argv, { mode: 'all' });
  const changedAbsoluteFiles = new Set(changedRelativeFiles.map((file) => join(argv.root, file)));
  const intersectFiles = mergedFiles.filter((file) => changedAbsoluteFiles.has(file));

  if (intersectFiles.length > 0) {
    const changedFiles = intersectFiles.map((file) => `       ▸ ${file}\n`).join('');

    throw new Error(`The following files were changed after adding:\n${changedFiles}`);
  }

  switch (hook) {
    case 'commit':
      if (stagedFiles.length > 0) {
        await analyseTask({ ...argv, ci: false }, { files: { eslintFiles, prettierFiles }, only: analysePreServices });
        await gitAddAction(argv, { files });
      }

      break;

    case 'msg':
      if (typeof edit !== 'string' || edit.trim() === '') {
        throw new Error(`Argument "edit" is required at hook "${hook}"`);
      }

      await commitlintAction(argv, { edit });
      await analyseTask({ ...argv, ci: false }, { files: { eslintFiles, prettierFiles }, only: analyseSuffixServices });
      await testTask({ ...argv, ci: true }, {});
      await manageTask(argv, {});
      await licenseTask(argv, {});
      await depsTask(argv, {});

      break;

    default:
      throw new Error(`The git hook "${hook as string}" is unknown`);
  }

  await taskHook(argv, { task: 'git', type: 'post' });
};

export type { GitProps };
export { gitTask, hooks };
