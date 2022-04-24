import { createBuilder, createHandler } from '../cli/yargs';
import type { ManageProps } from '../tasks/manageTask';
import { manageServices, manageTask } from '../tasks/manageTask';

const command = 'manage';
const desc = 'Run general conditions check';

const options = { group: `${command}-Options` } as const;

const handler = createHandler<ManageProps>(manageTask);
const builder = createBuilder<ManageProps>(command, (yargs) =>
  yargs.options({
    only: {
      ...options,
      alias: 'o',
      choices: manageServices,
      describe: 'Run a single condition check',
    },
  }),
);

export { command, desc, builder, handler };
