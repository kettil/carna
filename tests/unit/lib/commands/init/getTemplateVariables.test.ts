import getTemplateVariables from '../../../../../src/lib/commands/init/getTemplateVariables';

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
    const settings = getTemplateVariables({ cli, package: isPackage }, { github: { name: github } }, 'packageName');

    expect(settings).toMatchSnapshot();
  });
});
