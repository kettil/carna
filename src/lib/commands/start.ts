import { createBuilder, createHandler } from '../cli/yargs';
import { startTask, StartProps } from '../tasks/startTask';

const command = 'start';
const desc = 'Run application directly';

const options = { group: `${command}-Options` } as const;
const boolOptions = { ...options, type: 'boolean' } as const;

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
    'build-dependencies': {
      ...boolOptions,
      alias: 'b',
      describe: 'In a monorepo, all packages are built beforehand',
    },
    'clear-console': {
      ...boolOptions,
      alias: 'c',
      implies: ['watch'],
      conflicts: ['pino-pretty'],
      describe: 'Clear console on each restart (only with watch mode)',
    },
    'pino-pretty': {
      ...boolOptions,
      alias: 'p',
      conflicts: ['clear-console'],
      describe: 'Enables the pino log formatter (pino-pretty)',
    },
  }),
);

export { command, desc, builder, handler };
