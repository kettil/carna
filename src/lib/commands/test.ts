import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  commonHandler,
} from '../cli/yargs';
import testTask, { TestProps } from '../tasks/testTask';

export const command: CommandModuleCommand = 'test';
export const desc: CommandModuleDescribe = 'Run the jest tests';

const options = { group: `${command}-Options` } as const;
const boolOptions = { ...options, type: 'boolean', default: false } as const;

type Props = {
  project: TestProps['project'];
  updateSnapshot: Exclude<TestProps['updateSnapshot'], undefined>;
  sequence: Exclude<TestProps['sequence'], undefined>;
  runInBand: Exclude<TestProps['runInBand'], undefined>;
  watch: Exclude<TestProps['watch'], undefined>;
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    project: {
      ...options,
      type: 'string',
      alias: 'p',
      describe: 'Run only the tests of the specified projects',
    },
    updateSnapshot: {
      ...boolOptions,
      alias: 'u',
      describe: 'Use this flag to re-record every snapshot that fails during this test run',
    },
    sequence: {
      ...boolOptions,
      alias: 's',
      describe: 'Runs the jest projects in sequence',
    },
    runInBand: { ...boolOptions, alias: 'i', describe: 'Run all tests serially in the current process' },
    watch: { ...boolOptions, alias: 'w', describe: 'Watch files for changes and rerun tests related to changed files' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await commonHandler(argv, !argv.ci);

    await testTask(argv, argv);
  } catch (error) {
    errorHandler(argv, error);
  }
};
