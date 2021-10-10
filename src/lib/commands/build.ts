import { createBuilder, createHandler } from '../cli/yargs';
import { buildTask, BuildProps } from '../tasks/buildTask';

const command = 'build';
const desc = 'Run the build process';

const options = { group: `${command}-Options` } as const;
const boolOptions = { ...options, type: 'boolean', default: false } as const;

const handler = createHandler<BuildProps>(buildTask);
const builder = createBuilder<BuildProps>(command, (yargs) =>
  yargs.options({
    watch: {
      ...boolOptions,
      alias: 'w',
      describe: 'Watch files for changes and rebuild the changed files (without type files)',
    },
  }),
);

export { command, desc, builder, handler };
