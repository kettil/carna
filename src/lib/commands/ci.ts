import { createBuilder, createHandler } from '../cli/yargs';
import { ciTask, CiProps } from '../tasks/ciTask';

const command = 'ci';
const desc = 'Run build, analyse, tests, license and deps tasks';

const options = { group: `${command}-Options` } as const;

const handler = createHandler<CiProps>(ciTask);
const builder = createBuilder<CiProps>(command, (yargs) =>
  yargs.options({
    build: {
      ...options,
      type: 'boolean',
      alias: 'b',
      describe: 'Executes additionally the build process',
    },
  }),
);

export { command, desc, builder, handler };
