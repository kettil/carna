#!/usr/bin/env node

import { app } from '../lib/app';
import { exit } from '../lib/cmd/exit';

app(process.argv.slice(2)).catch((error) => {
  if (typeof error !== 'undefined' && !(error instanceof Error && error.name === 'YError')) {
    /* eslint-disable no-console -- show yargs error object */
    console.error(error);
    console.error('');
    /* eslint-enable no-console -- show yargs error object */

    exit();
  }
});
