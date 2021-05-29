/* eslint-disable @typescript-eslint/naming-convention */
import { LicensePackages } from '../lib/types';

const licensePackages: LicensePackages = {
  'json-schema': {
    // https://github.com/kriszyp/json-schema/blob/81ca359daeea643019a4ee81b7a57c06ac53d800/README.md
    '0.2.3': 'BSD-3-Clause',
  },

  'scss-parser': {
    // https://github.com/salesforce-ux/scss-parser/blob/v1.0.4/LICENSE
    // is not MIT, but the right is very similar
    '1.0.4': 'MIT',
  },
};

export { licensePackages };
