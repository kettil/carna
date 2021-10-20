import { isObject, isString } from '@kettil/tool-lib';
import { npmPackageLoadAction } from '../actions/npm/packageLoad';
import { npmRunAction } from '../actions/npm/run';
import { spinnerAction } from '../cli/spinner';
import { Task } from '../types';

type NpmProps = {
  task: string;
  type: 'post' | 'pre';
};

const taskHook: Task<NpmProps> = async (argv, { task, type }) => {
  const scripts = await npmPackageLoadAction(argv, { key: 'scripts' });
  const script = `${type}carna:${task}`;

  if (isObject(scripts) && isString(scripts[script])) {
    await spinnerAction(npmRunAction(argv, { script }), `Run npm script: ${script}`);
  } else {
    argv.log.info(`The NPM script "${script}" is not defined`);
  }
};

export { taskHook };
