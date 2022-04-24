import { join } from 'path';
import { isString } from '@kettil/tools';
import type { JestActionProps } from '../actions/types';

const getCoverageFolder = (path: string, projects: JestActionProps['projects']): string => {
  if (projects.length === 1) {
    const project = projects.at(0);

    if (isString(project)) {
      return join(path, 'coverage', `_${project.replace(/[^\da-z]+/giu, '_')}`);
    }
  }

  return join(path, 'coverage');
};

export { getCoverageFolder };
