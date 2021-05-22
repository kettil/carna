import { allSettledSequence, isArray, isObject, objectMap } from '@kettil/tool-lib';
import coverage, { WatermarkThreshold } from '../actions/tools/coverage';
import jest, { JestProps } from '../actions/tools/jest';
import getConfig from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import { Task } from '../types';
import getTestProjects from './helpers/getTestProjects';
import taskHook from './helpers/taskHook';
import testHook from './helpers/testHook';

export type TestProps = Omit<JestProps, 'projects'> & {
  projects?: string[];
};

const transformThreshold = (key: number | string, value: unknown): [number | string, WatermarkThreshold] => {
  if (isArray(value) && value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number') {
    return [key, value as unknown as [number, number]];
  }

  if (typeof value === 'number') {
    return [key, value];
  }

  return [key, undefined];
};

const testTask: Task<TestProps> = async (argv, props) => {
  const configThreshold = await getConfig(argv.cwd, 'test.coverage.threshold');
  const coverageThreshold = isObject(configThreshold) ? objectMap(configThreshold, transformThreshold) : undefined;

  await taskHook(argv, { task: 'test', type: 'pre' });

  const projects = await getTestProjects(argv, props.projects);

  if (props.watch) {
    try {
      await projects.reduce(
        (promise, project) => promise.then(() => testHook(argv, { project, type: 'pre' })),
        Promise.resolve(),
      );

      await jest(argv, { ...props, projects });
    } finally {
      await allSettledSequence(projects.map((project) => () => testHook(argv, { project, type: 'post' })));
    }
  } else {
    try {
      await projects.reduce(
        (promise, project) =>
          promise.then(async () => {
            try {
              await testHook(argv, { project, type: 'pre' });
              await spinnerAction(jest(argv, { ...props, projects: [project] }), `Test: ${project}`);
            } finally {
              await testHook(argv, { project, type: 'post' });
            }
          }),
        Promise.resolve(),
      );
    } finally {
      await coverage(argv, { projects, watermarks: coverageThreshold });
    }
  }

  await taskHook(argv, { task: 'test', type: 'post' });
};

export default testTask;
