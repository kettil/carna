import jest, { JestProps } from '../actions/tools/jest';
import { spinnerAction } from '../cli/spinner';
import { Task } from '../types';
import getTestProjects from './helpers/getTestProjects';
import npmHookTask from './subTasks/npmHookTask';

export type TestProps = Required<Omit<JestProps, 'project'>> & {
  project?: string;
  sequence: boolean;
};

const testTask: Task<TestProps> = async (argv, props) => {
  await npmHookTask(argv, { task: 'test', type: 'pre' });

  const projects = await getTestProjects(argv, { project: props.project });

  if (props.watch) {
    await jest(argv, { ...props, project: projects });
  } else if (props.sequence) {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const project of projects) {
      /* eslint-disable-next-line no-await-in-loop */
      await spinnerAction(jest(argv, { ...props, project }), `Jest: ${project}`);
    }
  } else {
    await spinnerAction(jest(argv, { ...props, project: undefined }), 'Jest');
  }

  await npmHookTask(argv, { task: 'test', type: 'post' });
};

export default testTask;
