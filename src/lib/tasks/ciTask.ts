import { PropsGlobal, Task } from '../types';
import analyseTask from './analyseTask';
import depsTask from './depsTask';
import licenseTask from './licenseTask';
import testTask from './testTask';

export type CiProps = {};

const ciTask: Task<CiProps> = async (argv) => {
  const extendArgv: PropsGlobal = { ...argv, ci: true };

  await analyseTask(extendArgv, {});
  await testTask(extendArgv, {});
  await licenseTask(extendArgv, {});
  await depsTask(extendArgv, {});
};

export default ciTask;
