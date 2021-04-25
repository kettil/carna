import { join } from 'path';
import jest, { JestProps, coverageFolderName } from '../actions/tools/jest';
import { spinnerAction } from '../cli/spinner';
import mkdir from '../cmd/mkdir';
import { Task } from '../types';
import getTestProjects from './helpers/getTestProjects';
import npmHookTask from './subTasks/npmHookTask';

export type TestProps = Omit<JestProps, 'project'> & {
  project?: string[];
};

const testTask: Task<TestProps> = async (argv, props) => {
  await npmHookTask(argv, { task: 'test', type: 'pre' });

  const projectList = await getTestProjects(argv, undefined, props.coverage);
  const projects = await getTestProjects(argv, props.project, props.coverage);

  // create a coverage folder
  await mkdir(join(argv.cwd, coverageFolderName));

  if (props.watch || props.coverage) {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const project of projects) {
      /* eslint-disable-next-line no-await-in-loop */
      await npmHookTask(argv, { task: ['test', project], type: 'pre' });
    }

    if (props.coverage) {
      await spinnerAction(jest(argv, { ...props, projectList, project: projects }), 'Test: coverage');
    } else {
      await jest(argv, { ...props, projectList, project: projects });
    }

    /* eslint-disable-next-line no-restricted-syntax */
    for (const project of projects) {
      /* eslint-disable-next-line no-await-in-loop */
      await npmHookTask(argv, { task: ['test', project], type: 'post' });
    }
  } else {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const project of projects) {
      /* eslint-disable no-await-in-loop */
      await npmHookTask(argv, { task: ['test', project], type: 'pre' });
      await spinnerAction(jest(argv, { ...props, projectList, project }), `Test: ${project}`);
      await npmHookTask(argv, { task: ['test', project], type: 'post' });
      /* eslint-enable no-await-in-loop */
    }
  }

  await npmHookTask(argv, { task: 'test', type: 'post' });
};

export default testTask;
