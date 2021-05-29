/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { LicenseHeuristics } from '../lib/types';

const licenseHeuristics: LicenseHeuristics = {
  'Apache-2.0*': /Apache License,?\s+Version 2\.0/u,
  'BSD*':
    /edistribution and use in source and binary forms, with or withou|edistribution and use of this software in source and binary forms, with or withou/u,
  'GPL-3.0*': /GNU GENERAL PUBLIC LICENSE\s*Version 3,/mu,
  'ISC*': /The ISC License/u,
  'MIT*': /MIT|The MIT License|ermission is hereby granted, free of charge, to any/u,
  'Public Domain': /[Pp]ublic [Dd]omain/u,
  'WTFPL*': /DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE/u,
};

export { licenseHeuristics };