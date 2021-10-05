import { coverageDefaultWatermark } from '../../../src/configs/actionConfigs';

describe('action configs', () => {
  test('coverageDefaultWatermark', () => {
    const [min, max] = coverageDefaultWatermark;

    expect(min).toBeLessThanOrEqual(max);
  });
});
