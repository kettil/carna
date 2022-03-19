import { isObject, objectEntries } from '@kettil/tool-lib';
import type { LicenseHeuristics } from '../../types';
import { reduceHeuristicList } from './reduceHeuristicList';

const getHeuristicConfig = ({
  config,
  replaceConfig,
  defaultHeuristics = {},
}: {
  config: Record<number | string, unknown>;
  replaceConfig: boolean;
  defaultHeuristics?: LicenseHeuristics;
}): LicenseHeuristics => {
  const items: LicenseHeuristics = replaceConfig ? {} : { ...defaultHeuristics };
  const { heuristics } = config;

  if (heuristics === undefined) {
    return items;
  }

  if (!isObject(heuristics)) {
    throw new TypeError('.carnarc.json: license.heuristics is not an object');
  }

  return objectEntries(heuristics).reduce(reduceHeuristicList, items);
};

export { getHeuristicConfig };
