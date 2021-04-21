import { TemplateVariable } from '../../actions/node/template';
import { InitSettingProps, InitSettings } from './getInitSettings';

const getInitTemplateVariables = (
  props: Pick<InitSettingProps, 'cli' | 'package'>,
  settings: Pick<InitSettings, 'github'>,
): Record<string, TemplateVariable> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const variables: Record<string, TemplateVariable> = {
    GITHUB_USERNAME: settings.github.name,
  };

  if (!props.package || props.cli) {
    variables.BABEL_MODULE_TYPE = 'commonjs';
    variables.BABEL_MODULE_TARGET = 'defaults';
  } else {
    variables.BABEL_MODULE_TYPE = false;
    variables.BABEL_MODULE_TARGET = { node: '14' };
  }

  return variables;
};

export default getInitTemplateVariables;
