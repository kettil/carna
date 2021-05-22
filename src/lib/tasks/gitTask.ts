import { Task } from '../types';
import taskHook from './helpers/taskHook';
import gitCommitTask from './subTasks/gitCommitTask';
import gitMessageTask, { GitMessageProps } from './subTasks/gitMessageTask';

export type GitProps = {
  edit?: GitMessageProps['edit'];
  hook: 'commit' | 'msg';
};

const gitTask: Task<GitProps> = async (argv, { edit, hook }) => {
  await taskHook(argv, { task: 'git', type: 'pre' });

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
      throw new Error(`The git hook "${hook}" is unknown`);
  }

  await taskHook(argv, { task: 'git', type: 'post' });
};

export default gitTask;
