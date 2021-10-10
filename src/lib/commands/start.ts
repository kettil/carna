import { createBuilder, createHandler } from '../cli/yargs';
import { startTask, StartProps } from '../tasks/startTask';

const command = 'start';
const desc = 'Run application directly';

const options = { group: `${command}-Options` } as const;
const boolOptions = { ...options, type: 'boolean', default: false } as const;

const handler = createHandler<StartProps>(startTask);
const builder = createBuilder<StartProps>(command, (yargs) =>
  yargs.options({
    watch: {
      ...boolOptions,
      alias: 'w',
      describe: 'Reload your app on source file changes',
    },
    script: {
      ...options,
      type: 'string',
      alias: 's',
      describe: 'Script to be called (default: src/index.[ts|js])',
    },
  }),
);

export { command, desc, builder, handler };
