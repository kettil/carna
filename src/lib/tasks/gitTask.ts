import { Task } from '../types';
import gitCommitTask from './subTasks/gitCommitTask';
import gitMessageTask, { GitMessageProps } from './subTasks/gitMessageTask';
import npmHookTask from './subTasks/npmHookTask';

export type GitProps = {
  edit: GitMessageProps['edit'] | undefined;
  hook: string;
};

const gitTask: Task<GitProps> = async (argv, { edit, hook }) => {
  await npmHookTask(argv, { task: 'git', type: 'pre' });

  switch (hook) {
    case 'commit':
      await gitCommitTask(argv);

      break;

    case 'msg':
      if (typeof edit !== 'string' || edit.trim() === '') {
        throw new Error(`Argument "edit" is required at hook "${hook}"`);
      }

      await gitMessageTask(argv, { edit });

      break;

    default:
      throw new Error(`The hook "${hook}" is unknown`);
  }

  await npmHookTask(argv, { task: 'git', type: 'post' });
};

export default gitTask;
