import { createBuilder, createHandler } from '../cli/yargs';
import { depsTask, DepsProps } from '../tasks/depsTask';

const command = 'deps';
const desc = 'Run dependency check';

const handler = createHandler<DepsProps>(depsTask);
const builder = createBuilder<DepsProps>(command, (yargs) => yargs);

export { command, desc, builder, handler };
