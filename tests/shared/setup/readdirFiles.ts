import { join } from 'path';
import { ReaddirMockFiles } from '../__mock__/fs';
import { cwd } from './argv';

const getReaddirFiles = (files: ReaddirMockFiles = {}): ReaddirMockFiles => ({
  [cwd]: [
    { name: 'node_modules', isFile: () => false, isDirectory: () => true },
    { name: 'README.md', isFile: () => true, isDirectory: () => false },
  ],
  [join(cwd, 'node_modules')]: [
    { name: 'module1', isFile: () => false, isDirectory: () => true },
    { name: 'module2', isFile: () => false, isDirectory: () => true },
    { name: 'module3', isFile: () => false, isDirectory: () => true },
    { name: 'README.md', isFile: () => true, isDirectory: () => false },
  ],
  [join(cwd, 'node_modules', 'module1')]: [
    { name: 'node_modules', isFile: () => false, isDirectory: () => true },
    { name: 'README.md', isFile: () => true, isDirectory: () => false },
    { name: 'package.json', isFile: () => true, isDirectory: () => false },
  ],
  [join(cwd, 'node_modules', 'module1', 'node_modules')]: [
    { name: 'module1-1', isFile: () => false, isDirectory: () => true },
    { name: 'README.md', isFile: () => true, isDirectory: () => false },
  ],
  [join(cwd, 'tests')]: [
    { name: 'unit', isFile: () => false, isDirectory: () => true },
    { name: 'e2e', isFile: () => false, isDirectory: () => true },
    { name: '.gitignore', isFile: () => true, isDirectory: () => false },
  ],
  ...files,
});

export { getReaddirFiles };
