import { createBuilder, createHandler } from '../cli/yargs';
import type { ManageProps } from '../tasks/manageTask';
import { manageTask } from '../tasks/manageTask';

const command = 'manage';
const desc = 'Run general conditions check';

const handler = createHandler<ManageProps>(manageTask);
const builder = createBuilder<ManageProps>(command, (yargs) => yargs);

export { command, desc, builder, handler };
