import type { Task } from '../types';
import { taskHook } from '../utils/taskHook';
import { gitCommitTask } from './subTasks/gitCommitTask';
import type { GitMessageProps } from './subTasks/gitMessageTask';
import { gitMessageTask } from './subTasks/gitMessageTask';

type GitProps = {
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
      throw new Error(`The git hook "${hook as string}" is unknown`);
  }

  await taskHook(argv, { task: 'git', type: 'post' });
};

export type { GitProps };
export { gitTask };
