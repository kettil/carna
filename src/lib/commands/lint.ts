import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
  commonHandler,
} from '../cli/yargs';
import analyseTask, { analyseServices, AnalyseProps } from '../tasks/analyseTask';

export const command: CommandModuleCommand = 'lint';
export const desc: CommandModuleDescribe = 'Run the code quality tools';

const options = { group: `${command}-Options` } as const;

type Props = {
  readonly only: AnalyseProps['selectedService'];
};

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    only: { ...options, choices: analyseServices, describe: 'Run a single code quality tool' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await commonHandler(argv, !argv.ci);

    await analyseTask(argv, { selectedService: argv.only });
  } catch (error) {
    errorHandler(argv, error);
  }
};
