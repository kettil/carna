import getInitTemplateVariables from '../../../../../src/lib/tasks/helpers/getInitTemplateVariables';

describe('getTemplateVariables()', () => {
  const params: Array<[boolean, boolean, string | undefined]> = [
    [false, false, undefined],
    [false, false, 'username'],
    [false, true, undefined],
    [false, true, 'username'],
    [true, false, undefined],
    [true, false, 'username'],
    [true, true, undefined],
    [true, true, 'username'],
  ];

  test.each(params)('it should work (cli: %p, package: %p, github: %p)', (cli, isPackage, github) => {
    const settings = getInitTemplateVariables({ cli, package: isPackage }, { github: { name: github } });

    expect(settings).toMatchSnapshot();
  });
});
