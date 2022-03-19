import { createBuilder, createHandler } from '../cli/yargs';
import type { StartProps } from '../tasks/startTask';
import { startTask } from '../tasks/startTask';

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
    // eslint-disable-next-line @typescript-eslint/naming-convention -- terminal name schema
    'build-dependencies': {
      ...boolOptions,
      alias: 'b',
      describe: 'In a monorepo, all packages are built beforehand',
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention -- terminal name schema
    'clear-console': {
      ...boolOptions,
      alias: 'c',
      implies: ['watch'],
      conflicts: ['pino-pretty'],
      describe: 'Clear console on each restart (only with watch mode)',
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention -- terminal name schema
    'pino-pretty': {
      ...boolOptions,
      alias: 'p',
      conflicts: ['clear-console'],
      describe: 'Enables the pino log formatter (pino-pretty)',
    },
  }),
);

export { command, desc, builder, handler };
