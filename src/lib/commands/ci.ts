import { createBuilder, createHandler } from '../cli/yargs';
import { ciTask, CiProps } from '../tasks/ciTask';

const command = 'ci';
const desc = 'Run analyse, tests, license and deps commands';

const handler = createHandler<CiProps>(ciTask);
const builder = createBuilder<CiProps>(command, (yargs) => yargs);

export { command, desc, builder, handler };
