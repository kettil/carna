import { join } from 'path';
import { env } from '@kettil/tool-lib';
import chalk from 'chalk';
import yargs from 'yargs';
import { logger } from './cli/logger';
import { errorHandler } from './cli/yargs';
import { PropsGlobal } from './types';

const cwd = process.cwd();
const root = join(__dirname, '..', '..');
const cfg = join(__dirname, '..', '..', 'configs');

const epilogue = [
  `Run ${chalk.bold('carna <command> --help')} to display the options of the commands `,
  '',
  'For more information, find our manual at https://github.com/kettil/carna',
];

const app = async (argv: string[]): Promise<void> => {
  (await yargs(argv)
    .locale('en')
    .option('ci', { default: env('CI', '') !== '', type: 'boolean', describe: 'Run carna in CI mode' })
    .option('verbose', { default: false, alias: 'v', type: 'boolean', desc: 'Print info messages' })
    .option('vvv', { default: false, type: 'boolean', desc: 'Print info/debug messages' })
    .option('root', { default: root, type: 'string', hidden: true })
    .option('cwd', { default: cwd, type: 'string', hidden: true })
    .option('cfg', { default: cfg, type: 'string', hidden: true })
    .middleware((argsInterpreted) => ({ log: logger(argsInterpreted) }))
    .parserConfiguration({ 'strip-aliased': true })
    .commandDir('../lib/commands')
    .demandCommand(1, 1)
    .strictCommands()
    .strictOptions()
    .usage('Usage: $0 <command> [options]')
    .epilogue(epilogue.join('\n'))
    .help()
    .version()
    .fail(errorHandler)
    .exitProcess(false)
    // middleware variables ("log") are not listed
    .parse()) as Omit<PropsGlobal, 'log'>;
};

export { app };
