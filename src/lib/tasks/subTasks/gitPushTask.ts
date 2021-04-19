import { Task } from '../../types';
import analyseTask from '../analyseTask';

const gitPushTask: Task = async (argv) => {
  await analyseTask({ ...argv, ci: true }, {});
};

export default gitPushTask;
