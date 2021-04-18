import { createBuilder, createHandler } from '../cli/yargs';
import depsTask, { DepsProps } from '../tasks/depsTask';

export const command = 'deps';
export const desc = 'Run the dependency check';

export const handler = createHandler<DepsProps>(depsTask);
export const builder = createBuilder<DepsProps>(command, (yargs) => yargs);
