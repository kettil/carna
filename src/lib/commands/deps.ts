import { createBuilder, createHandler } from '../cli/yargs';
import type { DepsProps } from '../tasks/depsTask';
import { depsTask } from '../tasks/depsTask';

const command = 'deps';
const desc = 'Run dependency check';

const handler = createHandler<DepsProps>(depsTask);
const builder = createBuilder<DepsProps>(command, (yargs) => yargs);

export { command, desc, builder, handler };
