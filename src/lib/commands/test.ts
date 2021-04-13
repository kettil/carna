import jest, { Props as JestProps } from '../actions/tools/jest';
import { spinnerAction } from '../cli/spinner';
import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  commonHandler,
  ciDefaultValue,
} from '../cli/yargs';
import getProjects, { Props as ProjectProps } from './test/getProjects';

export const command: CommandModuleCommand = 'test';
export const desc: CommandModuleDescribe = 'Run the jest tests';

const options = { group: `${command}-Options` } as const;
const boolOptions = { ...options, type: 'boolean', default: false } as const;

type Props = ProjectProps & Required<Omit<JestProps, 'project'>> & { sequence: boolean };

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
    ci: { ...boolOptions, default: ciDefaultValue(), conflicts: 'project', describe: 'Run it in CI mode' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await commonHandler(argv, !argv.ci);

    const projects = await getProjects(argv);

    if (argv.watch) {
      await jest(argv, { ...argv, project: projects });
    } else if (argv.sequence) {
      /* eslint-disable-next-line no-restricted-syntax */
      for (const project of projects) {
        /* eslint-disable-next-line no-await-in-loop */
        await spinnerAction(jest(argv, { ...argv, project }), `Jest: ${project}`);
      }
    } else {
      await spinnerAction(jest(argv, { ...argv, project: undefined }), 'Jest');
    }
  } catch (error) {
    errorHandler(argv, error);
  }
};
