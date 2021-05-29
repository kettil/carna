import { getInitTaskSettings } from '../../../../src/lib/utils/getInitTaskSettings';

describe('getSettings()', () => {
  const params: Array<[boolean, boolean, boolean, string | undefined]> = [
    [false, false, false, undefined],
    [false, false, false, 'username'],
    [false, false, true, undefined],
    [false, false, true, 'username'],
    [false, true, false, undefined],
    [false, true, false, 'username'],
    [false, true, true, undefined],
    [false, true, true, 'username'],

    [true, false, false, undefined],
    [true, false, false, 'username'],
    [true, false, true, undefined],
    [true, false, true, 'username'],
    [true, true, false, undefined],
    [true, true, false, 'username'],
    [true, true, true, undefined],
    [true, true, true, 'username'],
  ];

  test.each(params)(
    'it should work (cli: %p, package: %p, noCimmit: %p, github: %p)',
    (cli, isPackage, noCommit, github) => {
      const settings = getInitTaskSettings({ cli, noCommit, package: isPackage, github });

      expect(settings).toMatchSnapshot();
    },
  );

  test('throw an error if github is an blank string', () => {
    expect(() => {
      getInitTaskSettings({ cli: true, package: true, noCommit: false, github: '' });
    }).toThrow();
  });
});
