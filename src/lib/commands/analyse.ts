import { createBuilder, createHandler } from '../cli/yargs';
import { analyseServices, AnalyseProps, analyseTask } from '../tasks/analyseTask';

const command = 'analyse';
const desc = 'Run code quality tools';

const options = { group: `${command}-Options` } as const;

const handler = createHandler<AnalyseProps>(analyseTask);
const builder = createBuilder<AnalyseProps>(command, (yargs) =>
  yargs.options({
    only: { ...options, choices: analyseServices, describe: 'Run a single code quality tool' },
  }),
);

export { command, desc, builder, handler };
