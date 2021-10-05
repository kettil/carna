import { table } from '../../../../src/lib/cli/table';

describe('table', () => {
  test('it should works', () => {
    const data = [
      ['foo', '4'],
      ['bar', '7'],
    ];

    const result = table(data);

    expect(result).toMatchSnapshot();
  });

  test('it should throw an error by inconsistent records', () => {
    const data = [
      ['foo', '4', 'error'],
      ['bar', '7'],
    ];

    const callbackWithException = () => table(data);

    expect(callbackWithException).toThrow('The table rows are of different lengths');
  });
});
