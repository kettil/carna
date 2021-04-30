import { isArray, isObject, objectMap } from '@kettil/tool-lib';
import coverage, { WatermarkThreshold } from '../actions/tools/coverage';
import jest, { JestProps } from '../actions/tools/jest';
import getConfig from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import { Task } from '../types';
import getTestProjects from './helpers/getTestProjects';
import testHook from './helpers/testHook';
import npmHookTask from './subTasks/npmHookTask';

export type TestProps = Omit<JestProps, 'projects'> & {
  projects?: string[];
};

const transformThreshold = (key: number | string, value: unknown): [number | string, WatermarkThreshold] => {
  if (isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
    return [key, (value as unknown) as [number, number]];
  }

  if (typeof value === 'number') {
    return [key, value];
  }

  return [key, undefined];
};

const testTask: Task<TestProps> = async (argv, props) => {
  const configThreshold = await getConfig(argv.cwd, 'test.coverage.threshold');
  const coverageThreshold = isObject(configThreshold) ? objectMap(configThreshold, transformThreshold) : undefined;

  await npmHookTask(argv, { task: 'test', type: 'pre' });

  const projects = await getTestProjects(argv, props.projects);

  if (props.watch) {
    await projects.reduce(
      (promise, project) => promise.then(() => testHook(argv, { project, type: 'pre' })),
      Promise.resolve(),
    );

    await jest(argv, { ...props, projects });

    await projects.reduce(
      (promise, project) => promise.then(() => testHook(argv, { project, type: 'post' })),
      Promise.resolve(),
    );
  } else {
    await projects.reduce(
      (promise, project) =>
        promise.then(async () => {
          await testHook(argv, { project, type: 'pre' });
          await spinnerAction(jest(argv, { ...props, projects: [project] }), `Test: ${project}`);
          await testHook(argv, { project, type: 'post' });
        }),
      Promise.resolve(),
    );

    await coverage(argv, { projects, watermarks: coverageThreshold });
  }

  await npmHookTask(argv, { task: 'test', type: 'post' });
};

export default testTask;
