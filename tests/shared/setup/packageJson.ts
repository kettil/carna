import { join } from 'path';
import { cwd } from './argv';

const mockFilePackage = join(cwd, 'package.json');
const packageJson = {
  name: 'project-name',
  license: 'MIT',
  scripts: {},
  dependencies: { package: '0.1.0' },
  devDependencies: { typescript: '0.1.0' },
};
const packageJsonWithWorkspaces = {
  ...packageJson,
  workspaces: ['packages/*'],
};

export { mockFilePackage, packageJson, packageJsonWithWorkspaces };
