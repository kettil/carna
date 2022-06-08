import { join } from 'path';
import { cwd } from './argv';
import coverageE2E1 from './data/coverage-e2e-1.json';
import coverageUnit1 from './data/coverage-unit-1.json';
import coverageUnit2 from './data/coverage-unit-2.json';
import { mockFilePackage, packageJson } from './packageJson';

const coverageForUnit = {
  [join(cwd, 'src', 'index.ts')]: {
    ...coverageUnit1,
    path: join(cwd, 'src', 'index.ts'),
  },
  [join(cwd, 'src', 'lib', 'app.ts')]: {
    ...coverageUnit2,
    path: join(cwd, 'src', 'lib', 'app.ts'),
  },
};

// eslint-disable-next-line unicorn/prevent-abbreviations -- e2e is correkt name
const coverageForE2e = {
  [join(cwd, 'src', 'index.ts')]: {
    ...coverageE2E1,
    path: join(cwd, 'src', 'index.ts'),
  },
};

const getReadFileFiles = (files: Record<string, string> = {}): Record<string, string> => ({
  [mockFilePackage]: JSON.stringify(packageJson),

  [join(cwd, 'packages/a/package.json')]: JSON.stringify({
    name: 'workspace-name-a',
    license: 'MIT',
    dependencies: {
      'workspace-name-b': '0.1.0',
    },
  }),
  [join(cwd, 'packages/b/package.json')]: JSON.stringify({
    name: 'workspace-name-b',
    license: 'MIT',
  }),
  [join(cwd, 'packages/c/package.json')]: JSON.stringify({
    name: 'workspace-name-c',
    license: 'MIT',
  }),

  [join(cwd, 'node_modules/module1/package.json')]: JSON.stringify({
    name: 'sub-project-name-1',
    license: 'MIT',
  }),
  [join(cwd, 'node_modules/module1/node_modules/module1-1/package.json')]: JSON.stringify({
    name: 'sub-project-name-1-1',
    license: 'MIT',
  }),
  [join(cwd, 'node_modules/module2/package.json')]: JSON.stringify({
    name: 'sub-project-name-2',
    license: 'MIT',
  }),
  [join(cwd, 'node_modules/module3/package.json')]: JSON.stringify({
    name: 'sub-project-name-3',
    license: 'MIT',
  }),
  [join(cwd, 'coverage', '_e2e', 'coverage-final.json')]: JSON.stringify(coverageForE2e),
  [join(cwd, 'coverage', '_unit', 'coverage-final.json')]: JSON.stringify(coverageForUnit),
  ...files,
});

const getReadFileWithHooksFiles = (files: Record<string, string> = {}): Record<string, string> => ({
  ...getReadFileFiles(files),
  [mockFilePackage]: JSON.stringify({
    ...packageJson,
    scripts: {
      /* eslint-disable @typescript-eslint/naming-convention -- npm package script names */
      'precarna:analyse': 'echo "pre analyse hook is called"',
      'postcarna:analyse': 'echo "post analyse hook is called"',
      'precarna:build': 'echo "pre build hook is called"',
      'postcarna:build': 'echo "post build hook is called"',
      'precarna:ci': 'echo "pre ci hook is called"',
      'postcarna:ci': 'echo "post ci hook is called"',
      'precarna:deps': 'echo "pre deps hook is called"',
      'postcarna:deps': 'echo "post deps hook is called"',
      'precarna:git': 'echo "pre git hook is called"',
      'postcarna:git': 'echo "post git hook is called"',
      'precarna:license': 'echo "pre license hook is called"',
      'postcarna:license': 'echo "post license hook is called"',
      'precarna:start': 'echo "pre start hook is called"',
      'postcarna:start': 'echo "post start hook is called"',
      'precarna:test': 'echo "pre test hook is called"',
      'postcarna:test': 'echo "post test hook is called"',
      /* eslint-enable @typescript-eslint/naming-convention -- npm package script names */
    },
  }),
});

export { getReadFileFiles, getReadFileWithHooksFiles };
