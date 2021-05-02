import babelNode from '../actions/tools/babelNode';
import { Task } from '../types';
import taskHook from './helpers/taskHook';

export type StartProps = {
  watch: boolean;
  script?: string;
};

const startTask: Task<StartProps> = async (argv, props) => {
  await taskHook(argv, { task: 'start', type: 'pre' });

  await babelNode(argv, props);

  await taskHook(argv, { task: 'start', type: 'post' });
};

export default startTask;
