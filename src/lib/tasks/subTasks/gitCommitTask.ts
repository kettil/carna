import { uniqueArray } from '@kettil/tool-lib';
import { eslintExtensions, prettierExtensions } from '../../../configs/actionConfigs';
import { gitAddAction } from '../../actions/git/add';
import { gitLsAction } from '../../actions/git/ls';
import { gitStagedAction } from '../../actions/git/staged';
import { existFiles } from '../../cmd/existFiles';
import { Task } from '../../types';
import { analyseTask } from '../analyseTask';
import { depsTask } from '../depsTask';
import { licenseTask } from '../licenseTask';
import { testTask } from '../testTask';

const testEslint = new RegExp(`(${eslintExtensions.replace(/,/g, '|')})$`);
const testPrettier = new RegExp(`(${prettierExtensions.replace(/,/g, '|')})$`);

const gitCommitTask: Task = async (argv) => {
  const stagedFiles = await gitStagedAction(argv, {});

  if (stagedFiles.length === 0) {
    return;
  }

  const files = await existFiles(stagedFiles, argv.cwd);
  const eslintFiles = files.filter((file) => testEslint.test(file));
  const prettierFiles = files.filter((file) => testPrettier.test(file));
  const mergedFiles = uniqueArray([...prettierFiles, ...eslintFiles]);

  const unstagedFiles = await gitLsAction(argv, { mode: 'all' });
  const intersectFiles = mergedFiles.filter((file) => unstagedFiles.includes(file));

  if (intersectFiles.length > 0) {
    const changedFiles = intersectFiles.map((file) => `       ▸ ${file}\n`).join('');

    throw new Error(`The following files were changed after adding:\n${changedFiles}`);
  }

  await analyseTask({ ...argv, ci: false }, { eslintFiles, prettierFiles });

  await gitAddAction(argv, { files });

  await testTask({ ...argv, ci: true }, {});

  await licenseTask(argv, {});

  await depsTask(argv, {});
};

export { gitCommitTask };
