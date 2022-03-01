/* eslint-disable @typescript-eslint/naming-convention -- The keys are license names */
import { LicenseCompatibilities } from '../lib/types';

const licenseCompatibilities: LicenseCompatibilities = {
  MIT: [
    // single
    '0BSD',
    'Apache-2.0',
    'Apache-2.0*',
    'Artistic-2.0',
    'BSD-2-Clause',
    'BSD-3-Clause',
    'CC-BY-3.0',
    'CC-BY-4.0',
    'CC0-1.0',
    'ISC',
    'LGPL-3.0',
    'MIT',
    'MIT*',
    // https://www.mozilla.org/en-US/MPL/license-policy/
    'MPL-2.0',
    // https://opendatacommons.org/licenses/by/summary/
    'ODC-By-1.0',
    'Public Domain',
    'Python-2.0',
    'Unlicense',
    'WTFPL',

    // combined
    '(BSD-2-Clause OR MIT)',
    '(BSD-2-Clause OR MIT OR Apache-2.0)',
    '(BSD-3-Clause OR GPL-2.0)',
    'GPL-3.0-OR-LATER OR MIT',
    '(MIT OR APACHE-2.0)',
    '(MIT OR CC0-1.0)',
    '(WTFPL OR MIT)',
  ],
};

export { licenseCompatibilities };
