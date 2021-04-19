import { createBuilder, createHandler } from '../cli/yargs';
import ciTask, { CiProps } from '../tasks/ciTask';

export const command = 'ci';
export const desc = 'Run analyse, tests, license and deps commands';

export const handler = createHandler<CiProps>(ciTask);
export const builder = createBuilder<CiProps>(command, (yargs) => yargs);
