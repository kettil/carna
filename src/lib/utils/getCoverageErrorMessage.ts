import { bold, red } from 'chalk';
import type { CoverageSummary } from 'istanbul-lib-coverage';
import type { Watermark, Watermarks } from 'istanbul-lib-report';
import { getCoverageWatermark } from './getCoverageWatermark';

const getCoverageErrorMessage = (
  key: keyof Watermarks,
  watermarks: Partial<Record<keyof Watermarks, Watermark | number>>,
  coverageSummary: CoverageSummary,
): string => {
  const limit = Math.min(...getCoverageWatermark(watermarks[key]));
  const value = coverageSummary[key].pct;

  return red(`Coverage threshold for ${bold(key)} (${limit}%) not met: ${value}%`);
};

export { getCoverageErrorMessage };
