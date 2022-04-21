import { createBuilder, createHandler } from '../cli/yargs';
import type { GitProps } from '../tasks/gitTask';
import { gitTask } from '../tasks/gitTask';

const command = 'git';
const desc = 'Handler for the git hooks';

const options = { group: `${command}-Options` } as const;

const handler = createHandler<GitProps>(gitTask);
const builder = createBuilder<GitProps>(command, (yargs) =>
  yargs.options({
    edit: {
      ...options,
      type: 'string',
      require: true,
      desc: 'Path to the COMMIT_EDITMSG file',
    },
  }),
);

export { command, desc, builder, handler };
