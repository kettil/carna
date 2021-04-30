import { isObject } from '@kettil/tool-lib';
import npmPackageLoad from '../../actions/npm/packageLoad';
import npmRun from '../../actions/npm/run';
import { spinnerAction } from '../../cli/spinner';
import { Task } from '../../types';

type NpmProps = {
  task: string;
  type: 'post' | 'pre';
};

const npmHookTask: Task<NpmProps> = async (argv, { task, type }) => {
  const scripts = await npmPackageLoad(argv, { key: 'scripts' });
  const script = `${type}carna:${task}`;

  if (isObject(scripts) && typeof scripts[script] === 'string') {
    await spinnerAction(npmRun(argv, { script }), `Run npm script: ${script}`);
  } else {
    argv.log.info(`The NPM script "${script}" is not defined`);
  }
};

export default npmHookTask;
