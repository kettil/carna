/* eslint-disable unicorn/prefer-ternary -- is more readable with the "await" */
import { npmPackageWorkspacesAction } from '../actions/npm/packageWorkspaces';
import { getConfig } from '../cli/config';
import type { Task } from '../types';
import { isSelectedService } from '../utils/isSelectedService';
import { taskHook } from '../utils/taskHook';
import { taskIsDiasbled } from '../utils/taskIsDiasbled';
import { manageDepsTask } from './subTasks/manageDepsTask';
import { manageLicenseTask } from './subTasks/manageLicenseTask';
import { managePackageLintTask } from './subTasks/managePackageLintTask';

const manageServices = ['package', 'dependency', 'license'] as const;

type ManageProps = {
  only?: typeof manageServices[number];
};

const manageTask: Task<ManageProps> = async (argv, { only }) => {
  const packageLintDisable = await getConfig(argv.root, 'packageLint.disable');
  const depsDisable = await getConfig(argv.root, 'deps.disable');
  const licenseDisable = await getConfig(argv.root, 'license.disable');
  const workspacePaths = await npmPackageWorkspacesAction(argv);

  await taskHook(argv, { task: 'manage', type: 'pre' });

  if (isSelectedService<typeof manageServices[number]>(only, 'package')) {
    // check package.json file(s)
    if (packageLintDisable === true) {
      await taskIsDiasbled('package.json verification is disabled');
    } else {
      await managePackageLintTask(argv, { workspacePaths });
    }
  }

  if (isSelectedService<typeof manageServices[number]>(only, 'dependency')) {
    // check dependecies
    if (depsDisable === true) {
      await taskIsDiasbled('Dependency verification is disabled');
    } else {
      await manageDepsTask(argv, { workspacePaths });
    }
  }

  if (isSelectedService<typeof manageServices[number]>(only, 'license')) {
    // check licenses
    if (licenseDisable === true) {
      await taskIsDiasbled('License verification is disabled');
    } else {
      await manageLicenseTask(argv, { workspacePaths });
    }
  }

  await taskHook(argv, { task: 'manage', type: 'post' });
};

export type { ManageProps };
export { manageTask, manageServices };
