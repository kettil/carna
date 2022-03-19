import { allSettledSequence, isArray, isObject, objectMap } from '@kettil/tool-lib';
import { coverageAction } from '../actions/tools/coverage';
import { jestAction } from '../actions/tools/jest';
import type { JestActionProps, CoverageWatermarkThreshold } from '../actions/types';
import { getConfig } from '../cli/config';
import { spinnerAction } from '../cli/spinner';
import type { Task } from '../types';
import { getTestProjects } from '../utils/getTestProjects';
import { taskHook } from '../utils/taskHook';
import { testHook } from '../utils/testHook';

type TestProps = Omit<JestActionProps, 'projects'> & {
  project?: string[];
};

const transformThreshold = (key: number | string, value: unknown): [number | string, CoverageWatermarkThreshold] => {
  if (isArray(value) && value.length === 2 && typeof value.at(0) === 'number' && typeof value.at(1) === 'number') {
    return [key, value as unknown as [number, number]];
  }

  if (typeof value === 'number') {
    return [key, value];
  }

  return [key, undefined];
};

const testTask: Task<TestProps> = async (argv, props) => {
  const configThreshold = await getConfig(argv.root, 'test.coverage.threshold');
  const coverageThreshold = isObject(configThreshold) ? objectMap(configThreshold, transformThreshold) : undefined;
  const projects = await getTestProjects(argv, props.project);

  await taskHook(argv, { task: 'test', type: 'pre' });

  if (projects.length > 0) {
    if (props.watch) {
      try {
        await projects.reduce(
          async (promise, project) => promise.then(async () => testHook(argv, { project, type: 'pre' })),
          Promise.resolve(),
        );

        await jestAction(argv, { ...props, projects });
      } finally {
        await allSettledSequence(projects.map((project) => async () => testHook(argv, { project, type: 'post' })));
      }
    } else {
      try {
        await projects.reduce(
          async (promise, project) =>
            promise.then(async () => {
              try {
                await testHook(argv, { project, type: 'pre' });
                await spinnerAction(jestAction(argv, { ...props, projects: [project] }), `Test: ${project}`);
              } finally {
                await testHook(argv, { project, type: 'post' });
              }
            }),
          Promise.resolve(),
        );
      } finally {
        await coverageAction(argv, { projects, watermarks: coverageThreshold });
      }
    }
  }

  await taskHook(argv, { task: 'test', type: 'post' });
};

export type { TestProps };
export { testTask };
