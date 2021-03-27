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
  const options: Settings = {
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
      postinstall: 'husky install ./node_modules/carna/configs/husky',
      lint: 'npx carna lint',
    },
    packagePeerDependencies: [],

    github: {
      name: argv.github?.trim(),
    },
  };

  if (typeof options.github.name === 'string' && options.github.name === '') {
    throw new Error('The github name is empty');
  }

  // ######################
  // # Github             #
  // ######################

  if (typeof options.github.name === 'string') {
    options.folders.push('.dependabot', '.github/workflows');

    options.templates.push(['dependabot/config.yml', '.dependabot/config.yml']);
    options.templates.push(['github/CODEOWNERS', '.github/CODEOWNERS']);
    options.templates.push(['github/workflows/qa.yml', '.github/workflows/qa.yml']);
  }

  // ######################
  // # Library            #
  // ######################

  if (argv.package) {
    if (typeof options.github.name === 'string') {
      options.packageInit.repository = { type: 'git', url: `https://github.com/${options.github.name}/<repo>` };
      options.packageInit.bugs = { url: `https://github.com/${options.github.name}/<repo>/issues/new` };

      options.templates.push(['github/workflows/release.yml', '.github/workflows/release.yml']);
    }

    // Temporary until command release
    options.templates.push(['releaserc.json', '.releaserc.json']);
    // libraryDevelopment.push('@kettil/semantic-release-config');

    options.packageInit.publishConfig = { access: 'public' };
  }

  // ######################
  // # CLI                #
  // ######################

  if (argv.cli) {
    options.folders.push('src/bin');
    options.templates.push(['src/bin/index.ts']);
  }

  // ######################
  // # Babel/Webpack      #
  // ######################

  options.templates.push(['babel.config.js']);
  options.templates.push(['webpack.config.js']);

  options.libraryDevelopment.push(
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
    options.libraryDevelopment.push('@babel/runtime-corejs3');
    options.packagePeerDependencies.push('@babel/runtime-corejs3');
  } else {
    options.libraryProduction.push('@babel/runtime-corejs3');
  }

  // ######################
  // # Typescript         #
  // ######################

  options.files.push('src/index.ts', 'src/lib/types.ts');

  options.templates.push(['typescriptrc.json', 'tsconfig.json']);
  options.templates.push(['typescriptrc.build.json', 'tsconfig.build.json']);

  options.libraryDevelopment.push('@types/node', 'typescript');

  options.packageUpdate.module = 'build/index.js';
  options.packageUpdate.types = 'build/index.d.ts';

  // ######################
  // # Build              #
  // ######################

  options.packageScripts.build = 'npx carna build';
  options.packageScripts.prebuild = 'rm -rf ./build';

  // ######################
  // # React              #
  // ######################

  /*
  // PROD or DEV (with peerDependencies)
  "react"
  "react-dom"

  if (argv.package) {
    options.packagePeerDependencies.push('@babel/preset-react', '@types/react', '@types/react-dom');
  }
  */

  // ######################
  // # Jest               #
  // ######################

  options.templates.push(['jest.config.js'], ['jest.ci.js']);

  options.libraryDevelopment.push('jest', '@types/jest', 'babel-jest');

  options.files.push('src/index.test.ts');

  options.packageScripts.test = 'jest --selectProjects unit';
  options.packageScripts['test:integration'] = 'jest --selectProjects integration';
  options.packageScripts['test:watch'] = 'npm run test -- --watch';
  options.packageScripts['test:integration:watch'] = 'npm run test:integration -- --watch';

  return options;
};

export default getSettings;
