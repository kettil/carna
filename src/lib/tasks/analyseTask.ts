import eslint, { EslintProps } from '../actions/tools/eslint';
import prettier, { prettierExtensionCi, PrettierProps } from '../actions/tools/prettier';
import tsc, { getTscConfigPath } from '../actions/tools/tsc';
import { spinnerAction } from '../cli/spinner';
import FirstExistFileError from '../errors/firstExistFileError';
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
    try {
      await getTscConfigPath(argv.cwd, 'type-check');
      await spinnerAction(tsc(argv, { mode: 'type-check' }), 'Analyse: Typescript');
    } catch (error) {
      if (error instanceof FirstExistFileError) {
        argv.log.info('Typing check is skipped (tsconfig.json was not found) ');
      } else {
        throw error;
      }
    }
  }

  await taskHook(argv, { task: 'analyse', type: 'post' });
};

export default analyseTask;
