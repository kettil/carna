import { createBuilder, createHandler } from '../cli/yargs';
import startTask, { StartProps } from '../tasks/startTask';

export const command = 'start';
export const desc = 'Run application directly';

const options = { group: `${command}-Options` } as const;
const boolOptions = { ...options, type: 'boolean', default: false } as const;

export const handler = createHandler<StartProps>(startTask);
export const builder = createBuilder<StartProps>(command, (yargs) =>
  yargs.options({
    watch: {
      ...boolOptions,
      alias: 'w',
      describe: 'Reload your app on source file changes',
    },
    script: {
      ...options,
      type: 'string',
      describe: 'Script to be called (default: src/index.[ts|js])',
    },
  }),
);
