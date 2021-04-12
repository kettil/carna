import { toCamelCase } from '@kettil/tool-lib';
import { TemplateVariable } from '../../actions/node/template';
import { PropsGlobal } from '../../types';
import { Props, Settings } from './getSettings';

const getTemplateVariables = (
  argv: Pick<Props & PropsGlobal, 'cli' | 'package'>,
  settings: Pick<Settings, 'github'>,
  packageName: string,
): Record<string, TemplateVariable> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const variables: Record<string, TemplateVariable> = {
    GITHUB_USERNAME: settings.github.name,
    PACKAGE_LIBRARY: toCamelCase(packageName),
    PACKAGE_FILENAME: packageName,
  };

  if (!argv.package || argv.cli) {
    variables.BABEL_MODULE_TYPE = 'commonjs';
    variables.BABEL_MODULE_TARGET = 'defaults';
  } else {
    variables.BABEL_MODULE_TYPE = false;
    variables.BABEL_MODULE_TARGET = { node: '14' };
  }

  return variables;
};

export default getTemplateVariables;
