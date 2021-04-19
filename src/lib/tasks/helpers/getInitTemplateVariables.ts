import { toCamelCase } from '@kettil/tool-lib';
import { TemplateVariable } from '../../actions/node/template';
import { InitSettingProps, InitSettings } from './getInitSettings';

const getInitTemplateVariables = (
  props: Pick<InitSettingProps, 'cli' | 'package'>,
  settings: Pick<InitSettings, 'github'>,
  packageName: string,
): Record<string, TemplateVariable> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const variables: Record<string, TemplateVariable> = {
    GITHUB_USERNAME: settings.github.name,
    PACKAGE_LIBRARY: toCamelCase(packageName),
    PACKAGE_FILENAME: packageName,
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
