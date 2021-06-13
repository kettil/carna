import { TemplateVariable } from '../actions/node/template';
import { InitSettings } from './getInitTaskSettings';

const getInitTaskTemplateVariables = (settings: Pick<InitSettings, 'github'>): Record<string, TemplateVariable> => ({
  /* eslint-disable @typescript-eslint/naming-convention -- Template strings */
  GITHUB_USERNAME: settings.github.name,
  /* eslint-enable @typescript-eslint/naming-convention -- Template strings */
});

export { getInitTaskTemplateVariables };
