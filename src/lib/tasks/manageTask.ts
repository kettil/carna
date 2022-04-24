/* eslint-disable unicorn/prefer-ternary -- is more readable with the "await" */
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { getConfig } from '../cli/config';
import type { Task } from '../types';
import { taskHook } from '../utils/taskHook';
import { taskIsDiasbled } from '../utils/taskIsDiasbled';
import { managePackageLintTask } from './subTasks/managePackageLintTask';

type ManageProps = {};

const manageTask: Task<ManageProps> = async (argv) => {
  const packageLintDisable = await getConfig(argv.root, 'packageLint.disable');
  const workspacePaths = await npmPackageWorkspacesAction(argv);

  await taskHook(argv, { task: 'manage', type: 'pre' });

  // check package.json file(s)
  if (packageLintDisable === true) {
    await taskIsDiasbled('package.json verification is disabled');
  } else {
    await managePackageLintTask(argv, { workspacePaths });
  }

  await taskHook(argv, { task: 'manage', type: 'post' });
};

export type { ManageProps };
export { manageTask };