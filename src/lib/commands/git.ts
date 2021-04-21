import { createBuilder, createHandler } from '../cli/yargs';
import gitTask, { GitProps } from '../tasks/gitTask';

export const command = 'git <hook>';
export const desc = 'Handler for the git hooks';

const mode = ['msg', 'commit'] as const;
const options = { group: `${command.slice(0, Math.max(0, command.indexOf('<'))).trim()}-Options` } as const;

export const handler = createHandler<GitProps>(gitTask);
export const builder = createBuilder<GitProps>(command, (yargs) =>
  yargs.positional('hook', { choices: mode, demandOption: true }).options({
    edit: { ...options, type: 'string', desc: 'Path to the COMMIT_EDITMSG file (only at hook "msg")' },
  }),
);
