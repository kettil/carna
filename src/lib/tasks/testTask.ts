import jest, { JestProps } from '../actions/tools/jest';
import { spinnerAction } from '../cli/spinner';
import { Task } from '../types';
import getTestProjects from './helpers/getTestProjects';
import npmHookTask from './subTasks/npmHookTask';

export type TestProps = Omit<JestProps, 'project'> & {
  project?: string[];
};

const testTask: Task<TestProps> = async (argv, props) => {
  await npmHookTask(argv, { task: 'test', type: 'pre' });

  const projects = await getTestProjects(argv, props.project, props.coverage);

  if (props.watch || props.coverage) {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const project of projects) {
      /* eslint-disable-next-line no-await-in-loop */
      await npmHookTask(argv, { task: ['test', project], type: 'pre' });
    }

    if (props.coverage) {
      await spinnerAction(jest(argv, { ...props, project: projects }), 'Jest: coverage');
    } else {
      await jest(argv, { ...props, project: projects });
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
      await spinnerAction(jest(argv, { ...props, project }), `Jest: ${project}`);
      await npmHookTask(argv, { task: ['test', project], type: 'post' });
      /* eslint-enable no-await-in-loop */
    }
  }

  await npmHookTask(argv, { task: 'test', type: 'post' });
};

export default testTask;
