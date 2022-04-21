import { join } from 'path';
import { prettierCiExtensions } from '../../configs/actionConfigs';
import { gitLsAction } from '../actions/git/ls';
import { eslintAction } from '../actions/tools/eslint';
import { prettierAction } from '../actions/tools/prettier';
import { tscAction } from '../actions/tools/tsc';
import type { EslintActionProps, PrettierActionProps } from '../actions/types';
import { spinnerAction } from '../cli/spinner';
import { access } from '../cmd/access';
import { existFiles } from '../cmd/existFiles';
import type { Task } from '../types';
import { cleanAnalyseFiles } from '../utils/cleanAnalyseFiles';
import { hasDependency } from '../utils/hasDependency';
import { taskHook } from '../utils/taskHook';

const analyseServices = ['eslint', 'prettier', 'typescript'] as const;

const isSelectedService = (value: string | undefined, service: typeof analyseServices[number]): boolean =>
  typeof value === 'undefined' || value === service;

type AnalyseProps = {
  only?: typeof analyseServices[number];
  all?: boolean;
  // internal
  files?: {
    prettierFiles: string[];
    eslintFiles: string[];
  };
};

const analyseTask: Task<AnalyseProps> = async (argv, { only, all, files }) => {
  await taskHook(argv, { task: 'analyse', type: 'pre' });

  let { eslintFiles, prettierFiles } = files ?? {};

  if (!all && typeof files === 'undefined') {
    const hasGitFolder = await access(join(argv.root, '.git'), 'readable');

    if (hasGitFolder) {
      const changedFiles = await gitLsAction(argv, { mode: 'all' });
      const changedAndExistFiles = await existFiles(changedFiles, argv.root);

      const cleanedFiles = cleanAnalyseFiles(changedAndExistFiles);

      eslintFiles = cleanedFiles.eslintFiles;
      prettierFiles = cleanedFiles.prettierFiles;
    }
  }

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
    const hasTypescript = await hasDependency(argv, { dependency: 'typescript', dependencyType: 'devDependencies' });

    if (hasTypescript) {
      await spinnerAction(tscAction(argv, { mode: 'type-check' }), 'Analyse: Typescript');
    }
  }

  await taskHook(argv, { task: 'analyse', type: 'post' });
};

export type { AnalyseProps };
export { analyseTask, analyseServices };
