// babel
const babelExtensions = '.js,.jsx,.ts,.tsx';
const babelScriptFiles = ['src/index.ts', 'src/index.js'];
const babelConfigFiles = ['babel.config.js', 'babel.config.json'];

// commitlint
const commitlintConfigFiles = ['commitlint.config.js', '.commitlintrc.js', '.commitlintrc.json', '.commitlintrc.yml'];

// jest/coverage
const coverageDefaultWatermark: [number, number] = [90, 50];
const jestConfigFiles = ['jest.config.js', 'jest.config.ts'];

// eslint
const eslintIgnoreFiles = new Set(['babel.config.js', 'jest.config.js']);
const eslintExtensions = 'js,ts,tsx';
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
const typescriptBuildConfigFiles = ['tsconfig.build.json'];

// depcheck
const depcheckIgnorePackages = ['@types/node', 'typescript'] as const;

export {
  babelConfigFiles,
  babelExtensions,
  babelScriptFiles,
  commitlintConfigFiles,
  jestConfigFiles,
  coverageDefaultWatermark,
  depcheckIgnorePackages,
  eslintConfigFiles,
  eslintExtensions,
  eslintIgnoreFiles,
  prettierConfigFiles,
  prettierCiExtensions,
  prettierExtensions,
  typescriptConfigFiles,
  typescriptBuildConfigFiles,
};
