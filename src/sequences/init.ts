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
import logo from '../lib/logo';

type Props = {
  readonly cli: boolean;
  readonly package: boolean;
  readonly react?: boolean;
  readonly github?: string;
  readonly noCommit: boolean;
};

export const command: CommandModuleCommand = 'init';
export const desc: CommandModuleDescribe = 'Initializes the project';

const options = { type: 'boolean', default: false, group: `${command}-Options:` } as const;

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    package: { ...options, alias: 'p', desc: 'Project is created as a package' },
    cli: { ...options, alias: 'c', implies: 'package', desc: 'Extends the package with CLI features' },
    github: { type: 'string', implies: 'package', desc: 'Github username', group: `${command}-Options:` },

    // conflict with cli
    // react: { ...options, alias: 'r', default: undefined, desc: 'React will be installed', },

    noCommit: { ...options, desc: 'No initial commit is executed at the end' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await logo();

    const githubUsername = argv.github?.trim();

    if (githubUsername !== undefined && githubUsername === '') {
      throw new Error('The github name is empty');
    }

    const files: string[] = [];
    const folders: string[] = ['.vscode', 'src', 'src/lib', 'tests'];
    const templates: Array<[string] | [string, string]> = [
      ['vscode/settings.json', '.vscode/settings.json'],
      ['editorconfig', '.editorconfig'],
      ['huskyrc.json', '.huskyrc'],
      ['eslintignore', '.eslintignore'],
      ['gitignore', '.gitignore'],
      ['npmignore', '.npmignore'],
      ['prettierignore', '.prettierignore'],
    ];

    const libraryProduction: string[] = [];
    const libraryDevelopment: string[] = ['husky', 'carna'];

    const packageBin: Record<string, string> = {};
    const packageInit: Record<string, string | number | boolean | Record<string, string>> = {
      private: true,
      version: '0.1.0',
      engines: { node: '>= 14', npm: '>=6' },
    };
    const packageUpdate: Record<string, string | number | boolean | Record<string, string>> = {};
    const packageScripts: Record<string, string> = {
      lint: 'npx carna lint',
    };
    const packagePeerDependencies: string[] = [];

    packageInit.author = 'name <email>';

    // ######################
    // # Github             #
    // ######################

    if (githubUsername) {
      folders.push('.dependabot', '.github/workflows');

      templates.push(['dependabot/config.yml', '.dependabot/config.yml']);
      templates.push(['github/CODEOWNERS', '.github/CODEOWNERS']);
      templates.push(['github/workflows/qa.yml', '.github/workflows/qa.yml']);
    }

    // ######################
    // # Library            #
    // ######################

    if (argv.package) {
      if (githubUsername) {
        packageInit.repository = { type: 'git', url: `https://github.com/${githubUsername}/<repo>` };
        packageInit.bugs = { url: `https://github.com/${githubUsername}/<repo>/issues/new` };

        templates.push(['github/workflows/release.yml', '.github/workflows/release.yml']);
      }

      // @todo Temporary until command release
      templates.push(['releaserc.json', '.releaserc.json']);
      // libraryDevelopment.push('@kettil/semantic-release-config');

      packageInit.publishConfig = { access: 'public' };
    }

    // ######################
    // # CLI                #
    // ######################

    if (argv.cli) {
      folders.push('src/bin');
      templates.push(['src/bin/index.ts']);
    }

    // ######################
    // # Babel/Webpack      #
    // ######################

    templates.push(['babel.config.js']);
    templates.push(['webpack.config.js']);

    libraryDevelopment.push(
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
      libraryDevelopment.push('@babel/runtime-corejs3');
      packagePeerDependencies.push('@babel/runtime-corejs3');
    } else {
      libraryProduction.push('@babel/runtime-corejs3');
    }

    // ######################
    // # Typescript         #
    // ######################

    files.push('src/index.ts', 'src/lib/types.ts');

    templates.push(['typescriptrc.json', 'tsconfig.json']);

    libraryDevelopment.push('@types/node', 'typescript');

    packageUpdate.module = 'build/index.js';
    packageUpdate.types = 'build/index.d.ts';

    // ######################
    // # Build              #
    // ######################

    packageScripts.build = 'npx carna build';
    packageScripts.prebuild = 'rm -rf ./build';

    // ######################
    // # React              #
    // ######################

    /*
  // PROD or DEV (with peerDependencies)
  "react"
  "react-dom"

  if (argv.package) {
    packagePeerDependencies.push('@babel/preset-react', '@types/react', '@types/react-dom');
  }
  */

    // ######################
    // # Jest               #
    // ######################

    templates.push(['jest.config.js'], ['jest.ci.js']);

    libraryDevelopment.push('jest', '@types/jest', 'babel-jest');

    files.push('src/index.test.ts');

    packageScripts.test = 'jest --selectProjects unit';
    packageScripts['test:integration'] = 'jest --selectProjects integration';
    packageScripts['test:watch'] = 'npm run test -- --watch';
    packageScripts['test:integration:watch'] = 'npm run test:integration -- --watch';

    // ######################
    // # Actions            #
    // ######################

    // NPM
    await spinnerAction(npmInit(argv, { settings: { ...packageInit } }), 'Create the package.json');

    const packageName = await npmPackageLoad(argv, { key: 'name', throwError: true });

    if (typeof packageName !== 'string') {
      throw new TypeError('Package name could not be read');
    }

    packageUpdate.main = `build/${packageName}.js`;

    if (argv.cli) {
      packageBin[packageName] = 'build/bin/index.js';
    }

    // GIT
    await spinnerAction(gitInit(argv), 'Create the git repository');

    // FOLDER
    await spinnerAction(
      Promise.all(folders.map((folder) => nodeFolders(argv, { folder }))),
      'Create the project folders',
    );

    // FILES
    await spinnerAction(Promise.all(files.map((file) => nodeFiles(argv, { file }))), 'Create the project files');

    // TEMPLATES

    /* eslint-disable @typescript-eslint/naming-convention */
    const variables: Record<string, TemplateVariable> = {
      GITHUB_USERNAME: githubUsername,
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
      Promise.all(templates.map(([source, target]) => nodeTemplate(argv, { source, target, variables }))),
      'Create template files',
    );

    // NPM INSTALL PROD
    await spinnerAction(npmInstall(argv, { packages: libraryProduction, mode: 'prod' }), 'Install prod dependencies');

    // NPM INSTALL DEV
    await spinnerAction(npmInstall(argv, { packages: libraryDevelopment, mode: 'dev' }), 'Install dev dependencies');

    // UPDATE PACKAGE.JSON
    await spinnerAction(
      npmPackage(argv, {
        settings: {
          ...packageUpdate,
          bin: packageBin,
          scripts: packageScripts,
          peerDependencies: packagePeerDependencies,
        },
      }),
      'Update the package.json',
    );

    if (!argv.noCommit) {
      // GIT ADD
      await spinnerAction(gitAdd(argv, { files: ['.'] }), 'Add files to repository');

      // GIT COMMIT
      await spinnerAction(gitCommit(argv, { msg: 'feat: 🐣' }), 'Create the initial commit');
    }
  } catch (error) {
    errorHandler(argv, error);
  }
};
