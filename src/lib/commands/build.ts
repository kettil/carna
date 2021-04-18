import { createBuilder, createHandler } from '../cli/yargs';
import buildTask, { BuildProps } from '../tasks/buildTask';

export const command = 'build';
export const desc = 'Run the code quality tools';

export const handler = createHandler<BuildProps>(buildTask);
export const builder = createBuilder<BuildProps>(command, (yargs) => yargs);
