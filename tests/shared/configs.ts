import { join } from 'path';
import { isArray } from '@kettil/tool-lib';
import { Arguments } from 'yargs';
import { PropsGlobal } from '../../src/lib/types';
import { ReaddirMockFiles } from './__mock__/fs';

export const cwd = '/path/to/project';

const cfg = join(cwd, 'node_modules', 'carna', 'configs');
const tpl = join(cwd, 'node_modules', 'carna', 'templates');

const mockFilePackage = join(cwd, 'package.json');
const packageJson = {
  name: 'project-name',
  license: 'MIT',
  scripts: {},
  dependencies: { package: '0.1.0' },
};

const coverageForUnit = {
  [join(cwd, 'src', 'index.ts')]: {
    path: join(cwd, 'src', 'index.ts'),
    statementMap: { 0: { start: { line: 4, column: 41 }, end: { line: 15, column: 1 } } },
    fnMap: {},
    branchMap: {},
    s: { 0: 1 },
    f: {},
    b: {},
  },

  [join(cwd, 'src', 'lib', 'app.ts')]: {
    path: join(cwd, 'src', 'lib', 'app.ts'),
    statementMap: {
      0: { start: { line: 10, column: 12 }, end: { line: 10, column: 52 } },
    },
    fnMap: {
      0: {
        name: '(anonymous_0)',
        decl: { start: { line: 19, column: 12 }, end: { line: 19, column: 13 } },
        loc: { start: { line: 19, column: 53 }, end: { line: 42, column: 1 } },
        line: 19,
      },
    },
    branchMap: {},
    s: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 },
    f: { 0: 1, 1: 1 },
    b: {},
  },
};

// eslint-disable-next-line unicorn/prevent-abbreviations
const coverageForE2e = {
  [join(cwd, 'src', 'lib', 'app.ts')]: {
    path: join(cwd, 'src', 'lib', 'app.ts'),
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
  },
};

export const getArgv = <T extends Record<string, unknown>>(props: T): Arguments<PropsGlobal & T> => {
  const log = jest.fn((msg: unknown) => {
    expect(typeof msg === 'string' || isArray(msg)).toBeTruthy();
  });

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _: [],
    $0: '',
    cwd,
    cfg,
    tpl,
    ci: false,
    vvv: false,
    log: { debug: log, error: log, info: log, log },
    ...props,
  };
};

export const getAccessFiles = (files: Record<string, boolean> = {}): Record<string, boolean> => ({
  [cwd]: true,
  [cfg]: true,
  [tpl]: true,
  [mockFilePackage]: true,
  [join(cwd, '.git')]: false,
  [join(cwd, '.github')]: false,
  [join(cwd, '.github/ISSUE_TEMPLATE')]: false,
  [join(cwd, '.github/workflows')]: false,
  [join(cwd, '.carnarc.json')]: false,
  [join(cwd, '.commitlintrc.js')]: false,
  [join(cwd, '.commitlintrc.json')]: false,
  [join(cwd, '.commitlintrc.yml')]: false,
  [join(cwd, '.eslintrc.js')]: false,
  [join(cwd, '.eslintrc.cjs')]: false,
  [join(cwd, '.eslintrc.yaml')]: false,
  [join(cwd, '.eslintrc.yml')]: false,
  [join(cwd, '.eslintrc.json')]: false,
  [join(cwd, '.eslintrc')]: false,
  [join(cwd, '.prettierrc')]: false,
  [join(cwd, '.prettierrc.json')]: false,
  [join(cwd, '.prettierrc.yml')]: false,
  [join(cwd, '.prettierrc.yaml')]: false,
  [join(cwd, '.prettierrc.toml')]: false,
  [join(cwd, '.prettierrc.js')]: false,
  [join(cwd, 'prettier.config.js')]: false,
  [join(cwd, 'babel.config.js')]: true,
  [join(cwd, 'babel.config.json')]: false,
  [join(cwd, 'commitlint.config.js')]: false,
  [join(cwd, 'jest.config.ts')]: false,
  [join(cwd, 'jest.config.js')]: true,
  [join(cwd, 'tsconfig.json')]: true,
  [join(cwd, 'src/index.ts')]: true,
  [join(cwd, 'src/index.js')]: false,
  [join(cwd, 'src/lib/app.ts')]: true,
  [join(cwd, 'node_modules')]: true,
  [join(cwd, 'node_modules/module1/package.json')]: true,
  [join(cwd, 'node_modules/module1/node_modules')]: true,
  [join(cwd, 'node_modules/module1/node_modules/module1-1')]: true,
  [join(cwd, 'node_modules/module1/node_modules/module1-1/package.json')]: true,
  [join(cwd, 'node_modules/module1/node_modules/module1-1/node_modules')]: false,
  [join(cwd, 'node_modules/module2/package.json')]: true,
  [join(cwd, 'node_modules/module2/node_modules')]: false,
  [join(cwd, 'node_modules/module3/package.json')]: true,
  [join(cwd, 'node_modules/module3/node_modules')]: false,
  [join(cwd, 'coverage', '_e2e', 'coverage-final.json')]: true,
  [join(cwd, 'coverage', '_unit', 'coverage-final.json')]: true,
  [join(cwd, 'tests')]: true,
  [join(cwd, 'tests', 'e2e', 'pre.ts')]: false,
  [join(cwd, 'tests', 'e2e', 'pre.js')]: false,
  [join(cwd, 'tests', 'e2e', 'post.ts')]: false,
  [join(cwd, 'tests', 'e2e', 'post.js')]: false,
  [join(cwd, 'tests', 'unit', 'pre.ts')]: false,
  [join(cwd, 'tests', 'unit', 'pre.js')]: false,
  [join(cwd, 'tests', 'unit', 'post.ts')]: false,
  [join(cwd, 'tests', 'unit', 'post.js')]: false,
  ...files,
});

export const getReadFileFiles = (files: Record<string, string> = {}): Record<string, string> => ({
  [mockFilePackage]: JSON.stringify(packageJson),

  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'dependabot.yml')]: 'yaml: file',
  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'CODEOWNERS')]: '* @username',
  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'workflows', 'qa.yml')]: 'yml: file',
  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'workflows', 'release.yml')]: 'yml: file',
  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'ISSUE_TEMPLATE', 'bug.md')]: '# markdown',
  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'ISSUE_TEMPLATE', 'concept.md')]: '# markdown',
  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'ISSUE_TEMPLATE', 'epic.md')]: '# markdown',
  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'ISSUE_TEMPLATE', 'feature.md')]: '# markdown',
  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'ISSUE_TEMPLATE', 'question.md')]: '# markdown',
  [join(cwd, 'node_modules', 'carna', 'templates', 'github', 'ISSUE_TEMPLATE', 'task.md')]: '# markdown',

  [join(cwd, 'node_modules', 'carna', 'templates', 'vscode', 'settings.json')]: '{"file":"settings.json"}',
  [join(cwd, 'node_modules', 'carna', 'templates', 'carnarc.json')]: '{"file":"carnarc.json"}',
  [join(cwd, 'node_modules', 'carna', 'templates', 'releaserc.json')]: '{"file":"releaserc.json"}',
  [join(cwd, 'node_modules', 'carna', 'templates', 'typescriptrc.json')]: '{"file":"typescriptrc.json"}',
  [join(cwd, 'node_modules', 'carna', 'templates', 'typescriptrc.build.json')]: '{"file":"typescriptrc.build.json"}',
  [join(cwd, 'node_modules', 'carna', 'templates', 'editorconfig')]: 'editorconfig',
  [join(cwd, 'node_modules', 'carna', 'templates', 'eslintignore')]: 'eslintignore',
  [join(cwd, 'node_modules', 'carna', 'templates', 'gitignore')]: 'gitignore',
  [join(cwd, 'node_modules', 'carna', 'templates', 'npmignore')]: 'npmignore',
  [join(cwd, 'node_modules', 'carna', 'templates', 'prettierignore')]: 'prettierignore',
  [join(cwd, 'node_modules', 'carna', 'templates', 'src', 'bin', 'index.ts')]: '// index.ts',
  [join(cwd, 'node_modules', 'carna', 'templates', 'babel.config.js')]: '// babel.config.js',
  [join(cwd, 'node_modules', 'carna', 'templates', 'jest.config.js')]: '// jest.config.js',
  [join(cwd, 'node_modules', 'carna', 'templates', 'tests', 'dummy.test.ts')]: '// dummy.test.ts',
  [join(cwd, 'node_modules', 'carna', 'templates', 'tests', 'setupTests.ts')]: '// setupTests.ts',
  [join(cwd, 'node_modules', 'carna', 'templates', 'tests', 'pre.ts')]: '// pre.ts',
  [join(cwd, 'node_modules', 'carna', 'templates', 'tests', 'post.ts')]: '// post.ts',

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

export const getReadFileWithHooksFiles = (files: Record<string, string> = {}): Record<string, string> => ({
  ...getReadFileFiles(files),
  [mockFilePackage]: JSON.stringify({
    ...packageJson,
    scripts: {
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
    },
  }),
});

export const getReaddirFiles = (files: ReaddirMockFiles = {}): ReaddirMockFiles => ({
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
