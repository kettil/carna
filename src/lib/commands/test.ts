import { createBuilder, createHandler } from '../cli/yargs';
import { testTask, TestProps } from '../tasks/testTask';

const command = 'test';
const desc = 'Run tests';

const options = { group: `${command}-Options` } as const;
const boolOptions = { ...options, type: 'boolean', default: false } as const;

const handler = createHandler<TestProps>(testTask);
const builder = createBuilder<TestProps>(command, (yargs) =>
  yargs.options({
    project: {
      ...options,
      array: true,
      type: 'string',
      alias: 'p',
      describe: 'Run only the tests of the specified projects',
    },
    updateSnapshot: {
      ...boolOptions,
      alias: 'u',
      describe: 'Use this flag to re-record every snapshot that fails during this test run',
    },
    runInBand: { ...boolOptions, alias: 'i', describe: 'Run all tests serially in the current process' },
    watch: { ...boolOptions, alias: 'w', describe: 'Watch files for changes and rerun tests related to changed files' },
  }),
);

export { command, desc, builder, handler };
