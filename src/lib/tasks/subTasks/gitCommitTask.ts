import { uniqueArray } from '@kettil/tool-lib';
import gitAdd from '../../actions/git/add';
import gitLs from '../../actions/git/ls';
import gitStaged from '../../actions/git/staged';
import eslint, { eslintExtensionAll } from '../../actions/tools/eslint';
import jest from '../../actions/tools/jest';
import prettier, { prettierExtensionAll } from '../../actions/tools/prettier';
import tsc from '../../actions/tools/tsc';
import existFiles from '../../cmd/existFiles';
import { Task } from '../../types';

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

  await prettier(argv, { write: true, files: prettierFiles });
  await eslint(argv, { write: true, files: eslintFiles });

  await gitAdd(argv, { files });

  await tsc(argv, { mode: 'type-check' });

  await jest(argv, {});
};

export default gitCommitTask;
