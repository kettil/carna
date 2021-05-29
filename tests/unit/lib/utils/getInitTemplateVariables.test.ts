import { getInitTaskTemplateVariables } from '../../../../src/lib/utils/getInitTaskTemplateVariables';

describe('getTemplateVariables()', () => {
  test('it should work with github username', () => {
    const settings = getInitTaskTemplateVariables({ github: { name: 'username' } });

    expect(settings).toMatchSnapshot();
  });

  test('it should work without github username', () => {
    const settings = getInitTaskTemplateVariables({ github: { name: undefined } });

    expect(settings).toMatchSnapshot();
  });
});
