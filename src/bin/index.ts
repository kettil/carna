#!/usr/bin/env node

import { app } from '../lib/app';
import { exit } from '../lib/cmd/exit';

app(process.argv.slice(2)).catch((error) => {
  if (typeof error !== 'undefined' && !(error instanceof Error && error.name === 'YError')) {
    /* eslint-disable no-console */
    console.error(error);
    console.error('');
    /* eslint-enable no-console */

    exit();
  }
});
