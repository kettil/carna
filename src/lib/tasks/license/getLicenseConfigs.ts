import { licenseAliases } from '../../../configs/licenseAliases';
import { licenseCompatibilities } from '../../../configs/licenseCompatibilities';
import { licenseHeuristics } from '../../../configs/licenseHeuristics';
import { LicenseConfig } from '../../types';
import { getAliasConfig } from './getAliasConfig';
import { getCompatibilityConfig } from './getCompatibilityConfig';
import { getHeuristicConfig } from './getHeuristicConfig';
import { getIgnoreConfig } from './getIgnoreConfig';

const getLicenseConfigs = (licenseOptions: Record<number | string, unknown>): LicenseConfig => {
  const ignorePackages = getIgnoreConfig({ config: licenseOptions });

  const compatibilities = getCompatibilityConfig({
    config: licenseOptions,
    replaceConfig: licenseOptions.replaceCompatibleList === true,
    defaultCompatibilities: licenseCompatibilities,
  });

  const heuristics = getHeuristicConfig({
    config: licenseOptions,
    replaceConfig: licenseOptions.replaceHeuristicList === true,
    defaultHeuristics: licenseHeuristics,
  });

  const aliases = getAliasConfig({
    config: licenseOptions,
    replaceConfig: licenseOptions.replaceAliaseList === true,
    defaultAliases: licenseAliases,
  });

  return { compatibilities, heuristics, aliases, ignorePackages };
};

export { getLicenseConfigs };
