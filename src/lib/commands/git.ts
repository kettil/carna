import { createBuilder, createHandler } from '../cli/yargs';
import gitTask, { GitProps } from '../tasks/gitTask';

export const command = 'git';
export const desc = 'Handler for the git hooks';

const mode: Array<GitProps['hook']> = ['msg', 'commit'];
const options = { group: `${command}-Options` } as const;

export const handler = createHandler<GitProps>(gitTask);
export const builder = createBuilder<GitProps>(command, (yargs) =>
  yargs.options({
    hook: { ...options, choices: mode, demandOption: true },
    edit: { ...options, type: 'string', desc: 'Path to the COMMIT_EDITMSG file (only at hook "msg")' },
  }),
);
