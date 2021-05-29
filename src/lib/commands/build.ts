import { createBuilder, createHandler } from '../cli/yargs';
import { buildTask, BuildProps } from '../tasks/buildTask';

const command = 'build';
const desc = 'Run the build process';

const handler = createHandler<BuildProps>(buildTask);
const builder = createBuilder<BuildProps>(command, (yargs) => yargs);

export { command, desc, builder, handler };
