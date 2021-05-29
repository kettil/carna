import { createBuilder, createHandler } from '../cli/yargs';
import { initTask, InitProps } from '../tasks/initTask';

const command = 'init';
const desc = 'Initializes the project';

const args = { type: 'boolean', default: false, group: `${command}-Options:` } as const;

const handler = createHandler<InitProps>(initTask);
const builder = createBuilder<InitProps>(command, (yargs) =>
  yargs.options({
    package: { ...args, alias: 'p', desc: 'Project is created as a package' },
    cli: { ...args, alias: 'c', implies: 'package', desc: 'Extends the package with CLI features' },
    github: { type: 'string', desc: 'Github username', group: `${command}-Options:` },

    // conflict with cli
    // react: { ...args, alias: 'r', default: undefined, desc: 'React will be installed', },

    noCommit: { ...args, desc: 'No initial commit is executed at the end' },
  }),
);

export { command, desc, builder, handler };