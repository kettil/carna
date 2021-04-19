#!/usr/bin/env node
import { join } from 'path';
import { env } from '@kettil/tool-lib';
import chalk from 'chalk';
import yargs from 'yargs';
import logger from '../lib/cli/logger';
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
  .option('ci', { default: env('CI', '') !== '', type: 'boolean', describe: 'Run carna in CI mode' })
  .option('verbose', { default: false, alias: 'v', type: 'boolean', desc: 'Print info messages' })
  .option('vvv', { default: false, type: 'boolean', desc: 'Print info/debug messages' })
  .option('cwd', { default: cwd, type: 'string', hidden: true })
  .option('tpl', { default: tpl, type: 'string', hidden: true })
  .option('cfg', { default: cfg, type: 'string', hidden: true })
  .middleware((argv) => ({ log: logger(argv) }))
  .parserConfiguration({ 'strip-aliased': true })
  .commandDir('../lib/commands')
  .demandCommand(1, 1)
  .strictCommands()
  .strictOptions()
  .usage('Usage: $0 <command> [options]')
  .epilogue(epilogue.join('\n'))
  .help()
  .version().argv as Omit<PropsGlobal, 'log'>;
