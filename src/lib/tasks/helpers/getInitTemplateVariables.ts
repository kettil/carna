import { TemplateVariable } from '../../actions/node/template';
import { InitSettings } from './getInitSettings';

const getInitTemplateVariables = (settings: Pick<InitSettings, 'github'>): Record<string, TemplateVariable> => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const variables: Record<string, TemplateVariable> = {
    GITHUB_USERNAME: settings.github.name,
  };

  return variables;
};

export default getInitTemplateVariables;
