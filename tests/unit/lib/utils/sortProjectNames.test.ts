import { sortProjectNames } from '../../../../src/lib/utils/sortProjectNames';

describe('sortProjectNames()', () => {
  test('it should work with correct order', () => {
    const result = ['e2e', 'foo'].sort(sortProjectNames([]));

    expect(result).toEqual(['e2e', 'foo']);
  });

  test('it should work with incorrect order', () => {
    const result = ['foo', 'e2e'].sort(sortProjectNames([]));

    expect(result).toEqual(['e2e', 'foo']);
  });

  test('it should work with special keys', () => {
    const result = ['e2e', 'integration', 'foo', 'unit'].sort(sortProjectNames(['unit', 'integration']));

    expect(result).toEqual(['unit', 'integration', 'e2e', 'foo']);
  });

  test('it should work with packages', () => {
    const result = ['project1:foo', 'project2:foo', 'project2:e2e', 'project1:e2e'].sort(sortProjectNames([]));

    expect(result).toEqual(['project1:e2e', 'project1:foo', 'project2:e2e', 'project2:foo']);
  });

  test('it should work with packages and special keys', () => {
    const result = [
      'project1:e2e',
      'project1:integration',
      'project1:foo',
      'project1:unit',
      'project2:e2e',
      'project2:integration',
      'project2:foo',
      'project2:unit',
    ].sort(sortProjectNames(['unit', 'integration']));

    expect(result).toEqual([
      'project1:unit',
      'project2:unit',
      'project1:integration',
      'project2:integration',
      'project1:e2e',
      'project1:foo',
      'project2:e2e',
      'project2:foo',
    ]);
  });
});
