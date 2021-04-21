import getInitTemplateVariables from '../../../../../src/lib/tasks/helpers/getInitTemplateVariables';

describe('getTemplateVariables()', () => {
  test('it should work with github username', () => {
    const settings = getInitTemplateVariables({ github: { name: 'username' } });

    expect(settings).toMatchSnapshot();
  });

  test('it should work without github username', () => {
    const settings = getInitTemplateVariables({ github: { name: undefined } });

    expect(settings).toMatchSnapshot();
  });
});
