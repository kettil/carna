import { isArray } from '@kettil/tool-lib';
import type { Watermark } from 'istanbul-lib-report';
import { coverageDefaultWatermark } from '../../configs/actionConfigs';

const getCoverageWatermark = (watermark?: Watermark | number | undefined): Watermark => {
  if (isArray(watermark)) {
    const [v1, v2] = watermark;

    if (v1 > v2) {
      throw new Error(`The medium-watermarks "${v1}" must not be greater than high-watermarks "${v2}"`);
    }

    return watermark;
  }

  if (typeof watermark === 'number') {
    return [watermark, watermark];
  }

  return coverageDefaultWatermark;
};

export { getCoverageWatermark };
