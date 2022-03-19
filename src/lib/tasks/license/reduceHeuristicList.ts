import { isString } from '@kettil/tool-lib';
import type { LicenseHeuristics } from '../../types';

const reduceHeuristicList = (
  regexps: LicenseHeuristics,
  [licenseName, regexp]: readonly [number | string, unknown],
): LicenseHeuristics => {
  if (!isString(licenseName)) {
    throw new TypeError('.carnarc.json: license.heuristics has a key that is not a string');
  }

  if (!(regexp instanceof RegExp)) {
    throw new TypeError(`.carnarc.json: license.heuristics.${licenseName} is not a RegExp`);
  }

  return Object.assign(regexps, { [licenseName]: regexp });
};

export { reduceHeuristicList };
