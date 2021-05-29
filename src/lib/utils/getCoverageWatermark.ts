import { isArray } from '@kettil/tool-lib';
import { Watermark } from 'istanbul-lib-report';
import { coverageDefaultWatermark } from '../../configs/actionConfigs';

const getCoverageWatermark = (watermark?: Watermark | number | undefined): Watermark => {
  if (isArray(watermark)) {
    return watermark;
  }

  if (typeof watermark === 'number') {
    return [watermark, watermark];
  }

  return coverageDefaultWatermark;
};

export { getCoverageWatermark };
