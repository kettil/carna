import { babelNodeAction } from '../actions/tools/babelNode';
import { Task } from '../types';
import { taskHook } from '../utils/taskHook';

type StartProps = {
  watch: boolean;
  script?: string;
};

const startTask: Task<StartProps> = async (argv, props) => {
  await taskHook(argv, { task: 'start', type: 'pre' });

  await babelNodeAction(argv, props);

  await taskHook(argv, { task: 'start', type: 'post' });
};

export type { StartProps };
export { startTask };
