import { join } from 'path';
import { toCamelCase } from '@kettil/tool-lib';
import gitAdd from '../actions/git/add';
import gitCommit from '../actions/git/commit';
import gitInit from '../actions/git/init';
import nodeFiles from '../actions/node/file';
import nodeFolders from '../actions/node/folder';
import nodeTemplate, { TemplateVariable } from '../actions/node/template';
import npmInit from '../actions/npm/init';
import npmInstall from '../actions/npm/install';
import npmPackageLoad from '../actions/npm/packageLoad';
import npmPackage from '../actions/npm/packageUpdate';
import { spinnerAction } from '../lib/cli/spinner';
import {
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  CommandModuleBuilder,
  errorHandler,
} from '../lib/cli/yargs';
import access from '../lib/cmd/access';
import logo from '../lib/logo';

type Props = {
  readonly cli: boolean;
  readonly package: boolean;
  readonly react?: boolean;
  readonly github?: string;
  readonly noCommit: boolean;
};

type Options = {
  files: string[];
  folders: string[];
  templates: Array<[string] | [string, string]>;
  libraryProduction: string[];
  libraryDevelopment: string[];
  packageBin: Record<string, string>;
  packageInit: Record<string, string | number | boolean | Record<string, string>>;
  packageUpdate: Record<string, string | number | boolean | Record<string, string>>;
  packageScripts: Record<string, string>;
  packagePeerDependencies: string[];
  github: {
    name?: string;
  };
};

export const command: CommandModuleCommand = 'init';
export const desc: CommandModuleDescribe = 'Initializes the project';

const args = { type: 'boolean', default: false, group: `${command}-Options:` } as const;

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    package: { ...args, alias: 'p', desc: 'Project is created as a package' },
    cli: { ...args, alias: 'c', implies: 'package', desc: 'Extends the package with CLI features' },
    github: { type: 'string', implies: 'package', desc: 'Github username', group: `${command}-Options:` },

    // conflict with cli
    // react: { ...args, alias: 'r', default: undefined, desc: 'React will be installed', },

    noCommit: { ...args, desc: 'No initial commit is executed at the end' },
  }),
);

const getOptions = (argv: Props): Options => {
  const options: Options = {
    files: [],
    folders: ['.vscode', 'src', 'src/lib', 'tests'],
    templates: [
      ['vscode/settings.json', '.vscode/settings.json'],
      ['editorconfig', '.editorconfig'],
      ['huskyrc.json', '.huskyrc'],
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

  if (options.github.name) {
    options.folders.push('.dependabot', '.github/workflows');

    options.templates.push(['dependabot/config.yml', '.dependabot/config.yml']);
    options.templates.push(['github/CODEOWNERS', '.github/CODEOWNERS']);
    options.templates.push(['github/workflows/qa.yml', '.github/workflows/qa.yml']);
  }

  // ######################
  // # Library            #
  // ######################

  if (argv.package) {
    if (options.github.name) {
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

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await logo();

    const hasGitFolder = await access(join(argv.cwd, '.git'));

    const options = getOptions(argv);

    // NPM
    await spinnerAction(npmInit(argv, { settings: options.packageInit }), 'Create the package.json');

    const packageName = await npmPackageLoad(argv, { key: 'name', throwError: true });

    if (typeof packageName !== 'string') {
      throw new TypeError('Package name could not be read');
    }

    options.packageUpdate.main = `build/${packageName}.js`;

    if (argv.cli) {
      options.packageBin[packageName] = 'build/bin/index.js';
    }

    // GIT
    await spinnerAction(gitInit(argv), 'Create the git repository');

    // FOLDER
    await spinnerAction(
      Promise.all(options.folders.map((folder) => nodeFolders(argv, { folder }))),
      'Create the project folders',
    );

    // FILES
    await spinnerAction(
      Promise.all(options.files.map((file) => nodeFiles(argv, { file }))),
      'Create the project files',
    );

    // TEMPLATES

    /* eslint-disable @typescript-eslint/naming-convention */
    const variables: Record<string, TemplateVariable> = {
      GITHUB_USERNAME: options.github.name,
      PACKAGE_LIBRARY: toCamelCase(packageName),
      PACKAGE_FILENAME: packageName,
    };

    if (!argv.package || argv.cli) {
      variables.BABEL_MODULE_TYPE = 'commonjs';
      variables.BABEL_MODULE_TARGET = 'defaults';
    } else {
      variables.BABEL_MODULE_TYPE = false;
      variables.BABEL_MODULE_TARGET = { node: '14' };
    }

    /* eslint-enable @typescript-eslint/naming-convention */

    await spinnerAction(
      Promise.all(options.templates.map(([source, target]) => nodeTemplate(argv, { source, target, variables }))),
      'Create template files',
    );

    // NPM INSTALL PROD
    await spinnerAction(
      npmInstall(argv, { packages: options.libraryProduction, mode: 'prod' }),
      'Install prod dependencies',
    );

    // NPM INSTALL DEV
    await spinnerAction(
      npmInstall(argv, { packages: options.libraryDevelopment, mode: 'dev' }),
      'Install dev dependencies',
    );

    // UPDATE PACKAGE.JSON
    await spinnerAction(
      npmPackage(argv, {
        settings: {
          ...options.packageUpdate,
          bin: options.packageBin,
          scripts: options.packageScripts,
          peerDependencies: options.packagePeerDependencies,
        },
      }),
      'Update the package.json',
    );

    if (!argv.noCommit && !hasGitFolder) {
      // GIT ADD
      await spinnerAction(gitAdd(argv, { files: ['.'] }), 'Add files to repository');

      // GIT COMMIT
      await spinnerAction(gitCommit(argv, { msg: 'feat: 🐣' }), 'Create the initial commit');
    }
  } catch (error) {
    errorHandler(argv, error);
  }
};
