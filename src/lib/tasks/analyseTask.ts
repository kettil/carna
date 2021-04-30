import { join } from 'path';
import eslint, { EslintProps } from '../actions/tools/eslint';
import prettier, { prettierExtensionCi, PrettierProps } from '../actions/tools/prettier';
import tsc from '../actions/tools/tsc';
import { spinnerAction } from '../cli/spinner';
import access from '../cmd/access';
import { Task } from '../types';
import taskHook from './helpers/taskHook';

export const analyseServices = ['eslint', 'prettier', 'typescript'] as const;

const isSelectedService = (value: string | undefined, service: typeof analyseServices[number]): boolean =>
  typeof value === 'undefined' || value === service;

export type AnalyseProps = {
  only?: typeof analyseServices[number];
  // internal
  prettierFiles?: string[];
  eslintFiles?: string[];
};

const analyseTask: Task<AnalyseProps> = async (argv, { only, eslintFiles, prettierFiles }) => {
  await taskHook(argv, { task: 'analyse', type: 'pre' });

  const hasTypescriptConfig = await access(join(argv.cwd, 'tsconfig.json'), 'readable');

  if (isSelectedService(only, 'prettier')) {
    const prettierOptions: PrettierProps = {
      write: !argv.ci,
      extension: argv.ci ? prettierExtensionCi : undefined,
      files: prettierFiles,
    };

    await spinnerAction(prettier(argv, prettierOptions), 'Analyse: Prettier');
  }

  if (isSelectedService(only, 'eslint')) {
    const eslintOptions: EslintProps = {
      write: !argv.ci,
      files: eslintFiles,
    };

    await spinnerAction(eslint(argv, eslintOptions), 'Analyse: ESLint');
  }

  if (isSelectedService(only, 'typescript')) {
    if (hasTypescriptConfig) {
      await spinnerAction(tsc(argv, { mode: 'type-check' }), 'Analyse: Typescript');
    } else {
      argv.log.info('Typing check is skipped (tsconfig.json was not found) ');
    }
  }

  await taskHook(argv, { task: 'analyse', type: 'post' });
};

export default analyseTask;
