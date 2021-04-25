import { PropsGlobal, Task } from '../types';
import analyseTask from './analyseTask';
import buildTask from './buildTask';
import depsTask from './depsTask';
import licenseTask from './licenseTask';
import testTask from './testTask';

export type CiProps = {};

const ciTask: Task<CiProps> = async (argv) => {
  const extendArgv: PropsGlobal = { ...argv, ci: true };

  await analyseTask(extendArgv, {});
  await testTask(extendArgv, { coverage: false });
  await testTask(extendArgv, { coverage: true });
  await licenseTask(extendArgv, {});
  await depsTask(extendArgv, {});
  await buildTask(extendArgv, {});
};

export default ciTask;
