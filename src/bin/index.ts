#!/usr/bin/env node
import { join } from 'path';
import chalk from 'chalk';
import yargs from 'yargs';
import logger from '../lib/cli/logger';
import { ciDefaultValue } from '../lib/cli/yargs';
import { PropsGlobal } from '../lib/types';

const cwd = process.cwd();
const tpl = join(__dirname, '..', '..', 'templates');
const cfg = join(__dirname, '..', '..', 'configs');

const epilogue = [
  `Run ${chalk.bold('carna <command> --help')} to display the options of the commands `,
  '',
  'For more information, find our manual at https://github.com/kettil/carna',
];

yargs
  .locale('en')
  .option('ci', { default: ciDefaultValue(), type: 'boolean', describe: 'Run carna in CI mode' })
  .option('verbose', { default: false, alias: 'v', type: 'boolean', desc: 'Print info messages' })
  .option('vvv', { default: false, type: 'boolean', desc: 'Print info/debug messages' })
  .option('cwd', { default: cwd, type: 'string', hidden: true })
  .option('tpl', { default: tpl, type: 'string', hidden: true })
  .option('cfg', { default: cfg, type: 'string', hidden: true })
  .middleware((argv) => ({ log: logger(argv) }))
  .commandDir('../lib/commands')
  .demandCommand(1, 1)
  .strictCommands()
  .strictOptions()
  .usage('Usage: $0 <command> [options]')
  .epilogue(epilogue.join('\n'))
  .help()
  .version().argv as Omit<PropsGlobal, 'log'>;
