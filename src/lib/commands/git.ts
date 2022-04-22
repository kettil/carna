import { createBuilder, createHandler } from '../cli/yargs';
import type { GitProps } from '../tasks/gitTask';
import { hooks, gitTask } from '../tasks/gitTask';

const command = 'git';
const desc = 'Handler for the git hooks';

const options = { group: `${command}-Options` } as const;

const handler = createHandler<GitProps>(gitTask);
const builder = createBuilder<GitProps>(command, (yargs) =>
  yargs.options({
    hook: { ...options, choices: hooks, require: true },
    edit: {
      ...options,
      type: 'string',
      desc: 'Path to the COMMIT_EDITMSG file (only at hook "msg")',
    },
  }),
);

export { command, desc, builder, handler };
