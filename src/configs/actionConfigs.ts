// babel
const babelExtensions = '.js,.jsx,.ts,.tsx,.json';
const babelScriptFiles = ['src/index.ts', 'src/index.js'];
const babelConfigFiles = ['babel.config.js', 'babel.config.json'];
const babelCommand = './node_modules/.bin/babel';
const babelCommandNode = './node_modules/.bin/babel-node';
const babelCommandWatch = './node_modules/.bin/babel-watch';

// pino
const pinoPrettyCommand = './node_modules/.bin/pino-pretty';
const pinoPrettyIgnoreKeys = ['pid', 'hostname'];

// commitlint
const commitlintConfigFiles = ['commitlint.config.js', '.commitlintrc.js', '.commitlintrc.json', '.commitlintrc.yml'];
const commitlintCommand = './node_modules/.bin/commitlint';

// jest
const jestConfigFiles = ['jest.config.js', 'jest.config.ts'];
const jestCommand = './node_modules/.bin/jest';
const jestPreOrderProjects = ['unit', 'integration', 'e2e'];
// coverage
const coverageDefaultWatermark: [number, number] = [50, 90];

// eslint
const eslintIgnoreFiles = new Set(['babel.config.js', 'jest.config.js']);
const eslintExtensions = 'js,ts,tsx';
const eslintCommand = './node_modules/.bin/eslint';
const eslintConfigFiles = [
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json',
  '.eslintrc',
];

// prettier
const prettierCiExtensions = 'json,md,scss,yml,yaml,html';
const prettierExtensions = `ts,tsx,js,jsx,${prettierCiExtensions}`;
const prettierCommand = './node_modules/.bin/prettier';
const prettierConfigFiles = [
  '.prettierrc',
  '.prettierrc.json',
  '.prettierrc.yml',
  '.prettierrc.yaml',
  '.prettierrc.toml',
  '.prettierrc.js',
  'prettier.config.js',
];

// typescript
const typescriptConfigFiles = ['tsconfig.json'];
const typescriptBuildConfigFiles = ['tsconfig.build.json', 'tsconfig.json'];
const typescriptCommand = './node_modules/.bin/tsc';

// depcheck
const depcheckIgnorePackages = ['@types/node', 'typescript', 'carna'] as const;

export {
  babelCommand,
  babelCommandNode,
  babelCommandWatch,
  babelConfigFiles,
  babelExtensions,
  babelScriptFiles,
  commitlintCommand,
  commitlintConfigFiles,
  coverageDefaultWatermark,
  depcheckIgnorePackages,
  eslintCommand,
  eslintConfigFiles,
  eslintExtensions,
  eslintIgnoreFiles,
  jestCommand,
  jestConfigFiles,
  jestPreOrderProjects,
  pinoPrettyCommand,
  pinoPrettyIgnoreKeys,
  prettierCiExtensions,
  prettierCommand,
  prettierConfigFiles,
  prettierExtensions,
  typescriptBuildConfigFiles,
  typescriptCommand,
  typescriptConfigFiles,
};
