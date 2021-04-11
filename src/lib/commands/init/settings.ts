export type Settings = {
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

export type Props = {
  readonly cli: boolean;
  readonly package: boolean;
  readonly react?: boolean;
  readonly github?: string;
  readonly noCommit: boolean;
};

const getSettings = (argv: Props): Settings => {
  const settings: Settings = {
    files: [],
    folders: ['.vscode', 'src', 'src/lib', 'tests'],
    templates: [
      ['vscode/settings.json', '.vscode/settings.json'],
      ['editorconfig', '.editorconfig'],
      ['eslintignore', '.eslintignore'],
      ['gitignore', '.gitignore'],
      ['npmignore', '.npmignore'],
      ['prettierignore', '.prettierignore'],
    ],

    libraryProduction: [],
    libraryDevelopment: ['husky', 'carna'],

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
      debs: 'npx carna debs',
      license: 'npx carna license',
    },
    packagePeerDependencies: [],

    github: {
      name: argv.github?.trim(),
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

  if (argv.package) {
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

  if (argv.cli) {
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

  if (argv.package && !argv.cli) {
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

  if (argv.package) {
    settings.packagePeerDependencies.push('@babel/preset-react', '@types/react', '@types/react-dom');
  }
  */

  // ######################
  // # Jest               #
  // ######################

  settings.templates.push(['jest.config.js'], ['jest.ci.js']);

  settings.libraryDevelopment.push('jest', '@types/jest', 'babel-jest');

  settings.files.push('src/index.test.ts');

  settings.packageScripts.test = 'jest --selectProjects unit';
  settings.packageScripts['test:integration'] = 'jest --selectProjects integration';
  settings.packageScripts['test:watch'] = 'npm run test -- --watch';
  settings.packageScripts['test:integration:watch'] = 'npm run test:integration -- --watch';

  return settings;
};

export default getSettings;
