import { join } from 'path';
import { JestActionProps } from '../actions/types';

const getCoverageFolder = (path: string, projects: JestActionProps['projects']): string =>
  join(path, 'coverage', projects.length === 1 ? `_${projects[0].replace(/[^\da-z]+/giu, '_')}` : '');

export { getCoverageFolder };
