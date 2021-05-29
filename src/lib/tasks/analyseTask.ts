import { prettierCiExtensions } from '../../configs/actionConfigs';
import { eslintAction } from '../actions/tools/eslint';
import { prettierAction } from '../actions/tools/prettier';
import { tscAction } from '../actions/tools/tsc';
import { EslintActionProps, PrettierActionProps } from '../actions/types';
import { spinnerAction } from '../cli/spinner';
import { FirstExistFileError } from '../errors/firstExistFileError';
import { Task } from '../types';
import { getTypescriptConfigPath } from '../utils/getTypescriptConfigPath';
import { taskHook } from '../utils/taskHook';

const analyseServices = ['eslint', 'prettier', 'typescript'] as const;

const isSelectedService = (value: string | undefined, service: typeof analyseServices[number]): boolean =>
  typeof value === 'undefined' || value === service;

type AnalyseProps = {
  only?: typeof analyseServices[number];
  // internal
  prettierFiles?: string[];
  eslintFiles?: string[];
};

const analyseTask: Task<AnalyseProps> = async (argv, { only, eslintFiles, prettierFiles }) => {
  await taskHook(argv, { task: 'analyse', type: 'pre' });

  if (isSelectedService(only, 'prettier')) {
    const prettierOptions: PrettierActionProps = {
      write: !argv.ci,
      extension: argv.ci ? prettierCiExtensions : undefined,
      files: prettierFiles,
    };

    await spinnerAction(prettierAction(argv, prettierOptions), 'Analyse: Prettier');
  }

  if (isSelectedService(only, 'eslint')) {
    const eslintOptions: EslintActionProps = {
      write: !argv.ci,
      files: eslintFiles,
    };

    await spinnerAction(eslintAction(argv, eslintOptions), 'Analyse: ESLint');
  }

  if (isSelectedService(only, 'typescript')) {
    try {
      await getTypescriptConfigPath(argv.cwd, 'type-check');
      await spinnerAction(tscAction(argv, { mode: 'type-check' }), 'Analyse: Typescript');
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

export type { AnalyseProps };
export { analyseTask, analyseServices };
