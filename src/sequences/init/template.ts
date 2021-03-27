import { toCamelCase } from '@kettil/tool-lib';
import nodeTemplate, { TemplateVariable } from '../../actions/node/template';
import { spinnerAction } from '../../lib/cli/spinner';
import { PropsGlobal } from '../../lib/types';
import { Props, Settings } from './settings';

const templateAction = async (argv: Props & PropsGlobal, settings: Settings, packageName: string): Promise<void> => {
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

  /* eslint-enable @typescript-eslint/naming-convention */

  await spinnerAction(
    Promise.all(settings.templates.map(([source, target]) => nodeTemplate(argv, { source, target, variables }))),
    'Create template files',
  );
};

export default templateAction;
