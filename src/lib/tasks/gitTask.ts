import { isString } from '@kettil/tool-lib';
import { gitAddAction } from '../actions/git/add';
import { gitLsAction } from '../actions/git/ls';
import { gitStagedAction } from '../actions/git/staged';
import { commitlintAction } from '../actions/tools/commitlint';
import type { CommitlintActionProps } from '../actions/types';
import { existFiles } from '../cmd/existFiles';
import type { Task } from '../types';
import { cleanAnalyseFiles } from '../utils/cleanAnalyseFiles';
import { taskHook } from '../utils/taskHook';
import { analyseTask } from './analyseTask';
import { depsTask } from './depsTask';
import { licenseTask } from './licenseTask';
import { testTask } from './testTask';

type GitProps = {
  edit?: CommitlintActionProps['edit'];
};

const gitTask: Task<GitProps> = async (argv, { edit }) => {
  await taskHook(argv, { task: 'git', type: 'pre' });


  if (!isString(edit) || edit.trim() === '') {
    throw new Error('Argument "edit" is required');
  }


  // check the commit message
  await commitlintAction(argv, { edit });


  // check files
  const stagedFiles = await gitStagedAction(argv, {});

  if (stagedFiles.length > 0) {
    const files = await existFiles(stagedFiles, argv.cwd);
    const { eslintFiles, mergedFiles, prettierFiles } = cleanAnalyseFiles(files);
    const unstagedFiles = await gitLsAction(argv, { mode: 'all' });
    const intersectFiles = mergedFiles.filter((file) => unstagedFiles.includes(file));

    if (intersectFiles.length > 0) {
      const changedFiles = intersectFiles.map((file) => `       ▸ ${file}\n`).join('');

      throw new Error(`The following files were changed after adding:\n${changedFiles}`);
    }

    await analyseTask({ ...argv, ci: false }, { files: { eslintFiles, prettierFiles } });
    await gitAddAction(argv, { files });
    await testTask({ ...argv, ci: true }, {});
    await licenseTask(argv, {});
    await depsTask(argv, {});
  }

  await taskHook(argv, { task: 'git', type: 'post' });
};

export type { GitProps };
export { gitTask };
