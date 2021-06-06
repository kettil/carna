import { getInaccurateVersions } from '../../../../../../src/lib/actions/tools/utils/getInaccurateVersions';

describe('getInaccurateVersions()', () => {
  test('it should work', () => {
    const result = getInaccurateVersions({
      version: '2.0.1',
      range1: '1.0.0 - 2.9999.9999',
      range2: '>=1.0.2 <2.1.2',
      range3: '>1.0.2 <=2.3.4',
      range4: '<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0',
      postfix1: '1.2.3-234',
      postfix2: '1.2.3-alpha',
      postfix3: '1.2.3.beta',
      tilde1: '~1.2',
      tilde2: '~1.2.3',
      wildcard1: '2.x',
      wildcard2: '3.3.x',
      latest: 'latest',
      file: 'file:../common',
      http: 'http://exmplae.com/package.tar.gz',
      git: 'git://github.com/npm/cli.git',
    });

    expect(result).toMatchSnapshot();
  });

  test('it should works with a non object parameter', () => {
    const result = getInaccurateVersions('');

    expect(result).toEqual([]);
  });
});
