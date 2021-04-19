import { uniqueArray } from '@kettil/tool-lib';
import gitAdd from '../../actions/git/add';
import gitLs from '../../actions/git/ls';
import gitStaged from '../../actions/git/staged';
import { eslintExtensionAll } from '../../actions/tools/eslint';
import { prettierExtensionAll } from '../../actions/tools/prettier';
import existFiles from '../../cmd/existFiles';
import { Task } from '../../types';
import analyseTask from '../analyseTask';
import testTask from '../testTask';

const testEslint = new RegExp(`(${eslintExtensionAll.replace(/,/g, '|')})$`);
const testPrettier = new RegExp(`(${prettierExtensionAll.replace(/,/g, '|')})$`);

const gitCommitTask: Task = async (argv) => {
  const stagedFiles = await gitStaged(argv, {});

  if (stagedFiles.length === 0) {
    throw new Error('No stage files found');
  }

  const files = await existFiles(stagedFiles, argv.cwd);
  const eslintFiles = files.filter((file) => testEslint.test(file));
  const prettierFiles = files.filter((file) => testPrettier.test(file));
  const mergedFiles = uniqueArray([...prettierFiles, ...eslintFiles]);

  const unstagedFiles = await gitLs(argv, { mode: 'all' });
  const intersectFiles = mergedFiles.filter((file) => unstagedFiles.includes(file));

  if (intersectFiles.length > 0) {
    throw new Error(
      `The following files were changed after adding:\n${intersectFiles.map((file) => `       ▸ ${file}\n`).join('')}`,
    );
  }

  await analyseTask({ ...argv, ci: true }, { eslintFiles, prettierFiles });

  await gitAdd(argv, { files });

  await testTask({ ...argv, ci: true }, { coverage: false });
  await testTask({ ...argv, ci: true }, { coverage: true });
};

export default gitCommitTask;
