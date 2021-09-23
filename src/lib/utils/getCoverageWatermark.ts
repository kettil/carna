import { isArray } from '@kettil/tool-lib';
import { Watermark } from 'istanbul-lib-report';
import { coverageDefaultWatermark } from '../../configs/actionConfigs';

const getCoverageWatermark = (watermark?: Watermark | number | undefined): Watermark => {
  if (isArray(watermark)) {
    if (watermark[0] > watermark[1]) {
      throw new Error(`The medium-watermarks must not be greater than high-watermarks (${watermark})`);
    }

    return watermark;
  }

  if (typeof watermark === 'number') {
    return [watermark, watermark];
  }

  return coverageDefaultWatermark;
};

export { getCoverageWatermark };
