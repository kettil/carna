import type { PropsGlobal, Task } from '../types';
import { taskHook } from '../utils/taskHook';
import { analyseTask } from './analyseTask';
import { buildTask } from './buildTask';
import { depsTask } from './depsTask';
import { licenseTask } from './licenseTask';
import { testTask } from './testTask';

type CiProps = {
  build?: boolean;
};

const ciTask: Task<CiProps> = async (argv, { build }) => {
  const extendArgv: PropsGlobal = { ...argv, ci: true };

  await taskHook(argv, { task: 'ci', type: 'pre' });

  if (build) {
    await buildTask(extendArgv, {});
  }

  await analyseTask(extendArgv, {});
  await testTask(extendArgv, { verbose: true, runInBand: true });
  await licenseTask(extendArgv, {});
  await depsTask(extendArgv, {});

  await taskHook(argv, { task: 'ci', type: 'post' });
};

export type { CiProps };
export { ciTask };
