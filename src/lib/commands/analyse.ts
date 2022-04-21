import { createBuilder, createHandler } from '../cli/yargs';
import type { AnalyseProps } from '../tasks/analyseTask';
import { analyseServices, analyseTask } from '../tasks/analyseTask';

const command = 'analyse';
const desc = 'Run code quality tools';

const aliases = ['$0'];
const options = { group: `${command}-Options` } as const;
const boolOptions = { ...options, type: 'boolean', default: false } as const;

const handler = createHandler<AnalyseProps>(analyseTask);
const builder = createBuilder<AnalyseProps>(command, (yargs) =>
  yargs.options({
    all: {
      ...boolOptions,
      alias: 'a',
      describe: 'All files are checked and not only the changed/new files',
    },
    only: {
      ...options,
      alias: 'o',
      choices: analyseServices,
      describe: 'Run a single code quality tool',
    },
  }),
);

export { aliases, command, desc, builder, handler };
