import { getCoverageFolder } from '../../../../src/lib/utils/getCoverageFolder';

describe('getCoverageFolder()', () => {
  test('it should work without projects', () => {
    const result = getCoverageFolder('./', []);

    expect(result).toBe('coverage');
  });

  test('it should work with a project', () => {
    const result = getCoverageFolder('./', ['project:unit']);

    expect(result).toBe('coverage/_project_unit');
  });

  test('it should work with many projects', () => {
    const result = getCoverageFolder('./', ['project:unit', 'project:e2e']);

    expect(result).toBe('coverage');
  });
});
