#!/usr/bin/env node
import { join } from 'path';
import chalk from 'chalk';
import figlet from 'figlet';
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

// eslint-disable-next-line no-console, node/no-sync
console.log(`${figlet.textSync('Carna', { horizontalLayout: 'full', font: '3D Diagonal' })}\n`);

yargs
  .locale('en')
  .option('v', { default: false, type: 'boolean', hidden: true })
  .option('vvv', { default: false, type: 'boolean', hidden: true })
  .option('cwd', { default: cwd, type: 'string', hidden: true })
  .option('tpl', { default: tpl, type: 'string', hidden: true })
  .option('cfg', { default: cfg, type: 'string', hidden: true })
  .middleware((argv) => ({ log: logger(argv) }))
  .commandDir('../sequences')
  .demandCommand(1, 1)
  .usage('Usage: $0 <command> [options]')
  .epilogue(epilogue.join('\n'))
  .help()
  .version().argv as Omit<PropsGlobal, 'log'>;
