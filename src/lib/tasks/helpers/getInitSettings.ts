export type InitSettings = {
  files: string[];
  folders: string[];
  templates: Array<[string, string] | [string]>;
  libraryProduction: string[];
  libraryDevelopment: string[];
  packageBin: Record<string, string>;
  packageInit: Record<string, Record<string, string> | boolean | number | string>;
  packageUpdate: Record<string, Record<string, string> | boolean | number | string>;
  packageScripts: Record<string, string>;
  packagePeerDependencies: string[];
  github: {
    name?: string;
  };
};

export type InitSettingProps = {
  readonly cli: boolean;
  readonly package: boolean;
  // readonly react?: boolean;
  readonly github?: string;
  readonly noCommit: boolean;
};

const getInitSettings = (props: InitSettingProps): InitSettings => {
  const settings: InitSettings = {
    files: [],
    folders: ['.vscode', 'src', 'src/lib'],
    templates: [
      ['vscode/settings.json', '.vscode/settings.json'],
      ['editorconfig', '.editorconfig'],
      ['eslintignore', '.eslintignore'],
      ['gitignore', '.gitignore'],
      ['npmignore', '.npmignore'],
      ['prettierignore', '.prettierignore'],
    ],

    libraryProduction: [],
    libraryDevelopment: ['carna'],

    packageBin: {},
    packageInit: {
      private: true,
      version: '0.1.0',
      engines: { node: '>= 14', npm: '>=6' },
      author: 'name <email>',
    },
    packageUpdate: {},
    packageScripts: {
      prepare: '[ "$CI" != "" ] || husky install ./node_modules/carna/configs/husky',
      lint: 'npx carna lint',
      deps: 'npx carna deps',
      license: 'npx carna license',
    },
    packagePeerDependencies: [],

    github: {
      name: props.github?.trim(),
    },
  };

  if (typeof settings.github.name === 'string' && settings.github.name === '') {
    throw new Error('The github name is empty');
  }

  // ######################
  // # Github             #
  // ######################

  if (typeof settings.github.name === 'string') {
    settings.folders.push('.dependabot', '.github/workflows');

    settings.templates.push(['dependabot/config.yml', '.dependabot/config.yml']);
    settings.templates.push(['github/CODEOWNERS', '.github/CODEOWNERS']);
    settings.templates.push(['github/workflows/qa.yml', '.github/workflows/qa.yml']);
  }

  // ######################
  // # Library            #
  // ######################

  if (props.package) {
    if (typeof settings.github.name === 'string') {
      settings.packageInit.repository = { type: 'git', url: `https://github.com/${settings.github.name}/<repo>` };
      settings.packageInit.bugs = { url: `https://github.com/${settings.github.name}/<repo>/issues/new` };

      settings.templates.push(['github/workflows/release.yml', '.github/workflows/release.yml']);
    }

    // Temporary until command release
    settings.templates.push(['releaserc.json', '.releaserc.json']);
    // libraryDevelopment.push('@kettil/semantic-release-config');

    settings.packageInit.publishConfig = { access: 'public' };
  }

  // ######################
  // # CLI                #
  // ######################

  if (props.cli) {
    settings.folders.push('src/bin');
    settings.templates.push(['src/bin/index.ts']);
  }

  // ######################
  // # Babel/Webpack      #
  // ######################

  settings.templates.push(['babel.config.js']);
  settings.templates.push(['webpack.config.js']);

  settings.libraryDevelopment.push(
    '@babel/cli',
    '@babel/core',
    '@babel/plugin-transform-runtime',
    '@babel/preset-env',
    '@babel/preset-typescript',
    'babel-loader',
    'webpack',
    'webpack-cli',
  );

  if (props.package && !props.cli) {
    settings.libraryDevelopment.push('@babel/runtime-corejs3');
    settings.packagePeerDependencies.push('@babel/runtime-corejs3');
  } else {
    settings.libraryProduction.push('@babel/runtime-corejs3');
  }

  // ######################
  // # Typescript         #
  // ######################

  settings.files.push('src/index.ts', 'src/lib/types.ts');

  settings.templates.push(['typescriptrc.json', 'tsconfig.json']);
  settings.templates.push(['typescriptrc.build.json', 'tsconfig.build.json']);

  settings.libraryDevelopment.push('@types/node', 'typescript');

  settings.packageUpdate.module = 'build/index.js';
  settings.packageUpdate.types = 'build/index.d.ts';

  // ######################
  // # Build              #
  // ######################

  settings.packageScripts.build = 'npx carna build';
  settings.packageScripts.prebuild = 'rm -rf ./build';

  // ######################
  // # React              #
  // ######################

  /*
  // PROD or DEV (with peerDependencies)
  "react"
  "react-dom"

  if (props.package) {
    settings.packagePeerDependencies.push('@babel/preset-react', '@types/react', '@types/react-dom');
  }
  */

  // ######################
  // # Jest               #
  // ######################

  settings.templates.push(['jest.config.js']);

  settings.libraryDevelopment.push('jest', '@types/jest', 'babel-jest');

  settings.files.push('tests/helpers/.keep', 'tests/shared/.keep', 'tests/type/.keep');
  settings.folders.push('tests/helpers', 'tests/shared', 'tests/type', 'tests/unit', 'tests/integration', 'tests/e2e');

  settings.templates.push(
    ['dummy.test.ts', 'tests/unit/dummy.test.ts'],
    ['dummy.test.ts', 'tests/integration/dummy.test.ts'],
    ['dummy.test.ts', 'tests/e2e/dummy.test.ts'],
  );

  settings.packageScripts.test = 'npx carna test';
  settings.packageScripts['test:unit'] = 'npx carna test -p unit -w';
  settings.packageScripts['test:integration'] = 'npx carna test -p integration -w';
  settings.packageScripts['test:e2e'] = 'npx carna test -p e2e -w';

  return settings;
};

export default getInitSettings;
