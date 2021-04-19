import { createBuilder, createHandler } from '../cli/yargs';
import testTask, { TestProps } from '../tasks/testTask';

export const command = 'test';
export const desc = 'Run the jest tests';

const options = { group: `${command}-Options` } as const;
const boolOptions = { ...options, type: 'boolean', default: false } as const;

export const handler = createHandler<TestProps>(testTask);
export const builder = createBuilder<TestProps>(command, (yargs) =>
  yargs.options({
    coverage: {
      ...boolOptions,
      alias: 'c',
      describe: 'Runs the coverage projects together and builds the coverage from them',
    },
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
