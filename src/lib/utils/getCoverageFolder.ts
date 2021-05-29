import { join } from 'path';
import { JestActionProps } from '../actions/types';

const getCoverageFolder = (cwd: string, projects: JestActionProps['projects']): string =>
  join(cwd, 'coverage', projects.length === 1 ? `_${projects}` : '');

export { getCoverageFolder };
