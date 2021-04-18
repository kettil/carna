import { join } from 'path';
import eslint from '../actions/tools/eslint';
import prettier, { prettierExtensionCi } from '../actions/tools/prettier';
import tsc from '../actions/tools/tsc';
import { spinnerAction } from '../cli/spinner';
import access from '../cmd/access';
import { Task } from '../types';
import npmHookTask from './subTasks/npmHookTask';

export const analyseServices = ['eslint', 'prettier', 'typescript'] as const;

export type AnalyseProps = {
  selectedService?: typeof analyseServices[number];
};

const isSelectedService = (value: string | undefined, service: typeof analyseServices[number]): boolean =>
  typeof value === 'undefined' || value === service;

const analyseTask: Task<AnalyseProps> = async (argv, { selectedService }) => {
  await npmHookTask(argv, { task: 'analyse', type: 'pre' });

  const hasTypescriptConfig = await access(join(argv.cwd, 'tsconfig.json'), 'readable');

  if (isSelectedService(selectedService, 'prettier')) {
    await spinnerAction(
      prettier(argv, argv.ci ? { write: false, extension: prettierExtensionCi } : { write: true }),
      'Prettier',
    );
  }

  if (isSelectedService(selectedService, 'eslint')) {
    await spinnerAction(eslint(argv, argv.ci ? { write: false } : { write: true }), 'ESLint');
  }

  if (isSelectedService(selectedService, 'typescript')) {
    if (hasTypescriptConfig) {
      await spinnerAction(tsc(argv, { mode: 'type-check' }), 'Typescript');
    } else {
      argv.log.info('Typing check is skipped (tsconfig.json was not found) ');
    }
  }

  await npmHookTask(argv, { task: 'analyse', type: 'post' });
};

export default analyseTask;
