import { createBuilder, createHandler } from '../cli/yargs';
import analyseTask, { analyseServices, AnalyseProps } from '../tasks/analyseTask';

export const command = 'analyse';
export const desc = 'Run code quality tools';

const options = { group: `${command}-Options` } as const;

export const handler = createHandler<AnalyseProps>(analyseTask);
export const builder = createBuilder<AnalyseProps>(command, (yargs) =>
  yargs.options({
    only: { ...options, choices: analyseServices, describe: 'Run a single code quality tool' },
  }),
);
