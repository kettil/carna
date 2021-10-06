import { getPathFromNodeModulesParent } from '../../../../src/lib/utils/getPathFromNodeModulesParent';

describe('getPathFromNodeModulesParent()', () => {
  test('it should work', () => {
    const result = getPathFromNodeModulesParent('/path/to/node_modules/and/package', '/default/path');

    expect(result).toBe('/path/to');
  });

  test('it should work with default path', () => {
    const result = getPathFromNodeModulesParent('/path/to/other/package', '/default/path');

    expect(result).toBe('/default/path');
  });
});
