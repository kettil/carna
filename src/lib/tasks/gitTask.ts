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
      await npmHookTask(argv, { task: ['git', 'commit'], type: 'pre' });
      await gitCommitTask(argv);
      await npmHookTask(argv, { task: ['git', 'commit'], type: 'post' });
      break;

    case 'msg':
      if (typeof edit !== 'string' || edit.trim() === '') {
        throw new Error(`Argument "edit" is required at hook "${hook}"`);
      }

      await npmHookTask(argv, { task: ['git', 'msg'], type: 'pre' });
      await gitMessageTask(argv, { edit });
      await npmHookTask(argv, { task: ['git', 'msg'], type: 'post' });
      break;

    default:
      throw new Error(`The hook "${hook}" is unknown`);
  }

  await npmHookTask(argv, { task: 'git', type: 'post' });
};

export default gitTask;
