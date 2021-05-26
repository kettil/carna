import { PropsGlobal, Task } from '../types';
import analyseTask from './analyseTask';
import buildTask from './buildTask';
import depsTask from './depsTask';
import taskHook from './helpers/taskHook';
import licenseTask from './licenseTask';
import testTask from './testTask';

export type CiProps = {};

const ciTask: Task<CiProps> = async (argv) => {
  const extendArgv: PropsGlobal = { ...argv, ci: true };

  await taskHook(argv, { task: 'ci', type: 'pre' });

  await buildTask(extendArgv, {});
  await analyseTask(extendArgv, {});
  await testTask(extendArgv, {});
  await licenseTask(extendArgv, {});
  await depsTask(extendArgv, {});

  await taskHook(argv, { task: 'ci', type: 'post' });
};

export default ciTask;
