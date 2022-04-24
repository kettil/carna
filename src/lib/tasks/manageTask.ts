/* eslint-disable unicorn/prefer-ternary -- is more readable with the "await" */
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { getConfig } from '../cli/config';
import type { Task } from '../types';
import { taskHook } from '../utils/taskHook';
import { taskIsDiasbled } from '../utils/taskIsDiasbled';
import { manageDepsTask } from './subTasks/managedepsTask';
import { manageLicenseTask } from './subTasks/manageLicenseTask';
import { managePackageLintTask } from './subTasks/managePackageLintTask';

type ManageProps = {};

const manageTask: Task<ManageProps> = async (argv) => {
  const packageLintDisable = await getConfig(argv.root, 'packageLint.disable');
  const depsDisable = await getConfig(argv.root, 'deps.disable');
  const licenseDisable = await getConfig(argv.root, 'license.disable');
  const workspacePaths = await npmPackageWorkspacesAction(argv);

  await taskHook(argv, { task: 'manage', type: 'pre' });

  // check package.json file(s)
  if (packageLintDisable === true) {
    await taskIsDiasbled('package.json verification is disabled');
  } else {
    await managePackageLintTask(argv, { workspacePaths });
  }

  // check dependecies
  if (depsDisable === true) {
    await taskIsDiasbled('Dependency verification is disabled');
  } else {
    await manageDepsTask(argv, { workspacePaths });
  }

  // check licenses
  if (licenseDisable === true) {
    await taskIsDiasbled('License verification is disabled');
  } else {
    await manageLicenseTask(argv, { workspacePaths });
  }

  await taskHook(argv, { task: 'manage', type: 'post' });
};

export type { ManageProps };
export { manageTask };
