import { basename } from 'path';
import gitAdd from '../actions/git/add';
import gitCommit from '../actions/git/commit';
import gitInit from '../actions/git/init';
import nodeFiles from '../actions/node/file';
import nodeFolders from '../actions/node/folder';
import nodeTemplate from '../actions/node/template';
import npmInit from '../actions/npm/init';
import npmInstall from '../actions/npm/install';
import { spinnerAction } from '../lib/cli/spinner';
import {
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  CommandModuleBuilder,
} from '../lib/cli/yargs';

type Props = {
  readonly cli: boolean;
  readonly package: boolean;
  readonly github?: string;
  readonly 'no-jest': boolean;
  readonly 'no-commit': boolean;
  readonly 'no-ts': boolean;
  // Idea collection
  // - react
};

export const command: CommandModuleCommand = 'init';
export const desc: CommandModuleDescribe = 'Initializes the project';

const options = { type: 'boolean', default: false, group: `${command}-Options` } as const;

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    package: { ...options, alias: 'p', desc: 'Project is created as a package' },
    cli: { ...options, alias: 'c', implies: 'package', desc: 'Extends the package with CLI features' },

    'no-ts': { ...options, alias: 't', desc: 'Typescript will be not installed' },
    'no-jest': { ...options, alias: 'j', desc: 'Jest will be not installed' },
    'no-commit': { ...options, desc: 'No initial commit is executed at the end' },

    github: { type: 'string', implies: 'package', desc: 'Github username', group: command },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  const githubUsername = argv.github?.trim();

  if (githubUsername !== undefined && githubUsername === '') {
    throw new Error('The github name is empty');
  }

  const files: string[] = [];
  const folders: string[] = ['.vscode', 'src', 'src/lib', 'tests'];
  const templates: Array<[string] | [string, string]> = [
    ['vscode/settings.json', '.vscode/settings.json'],
    ['editorconfig', '.editorconfig'],
    ['huskyrc', '.huskyrc'],
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
    engines: { node: '>= 12.9' },
  };
  const packageUpdate: Record<string, string | number | boolean | Record<string, string>> = {};
  const packageScripts: Record<string, string> = {
    lint: 'npx carna lint',
  };

  // Typescript
  if (!argv['no-typescript']) {
    files.push('src/index.ts', 'src/lib/types.ts');

    templates.push(['tsconfig.json'], ['tsconfig.build.json']);

    libraryDevelopment.push('@types/node', 'typescript');

    packageUpdate.main = 'build/index.js';
    packageUpdate.types = 'build/index.d.ts';

    packageScripts.build = 'tsc --project ./tsconfig.build.json';
    packageScripts.prebuild = 'rm -rf ./build';
  } else {
    files.push('src/index.js');

    packageUpdate.main = 'src/index.js';
  }

  // Github
  if (githubUsername) {
    folders.push('.dependabot', '.github/workflows');

    templates.push(['dependabot/config.yml', '.dependabot/config.yml']);
    templates.push(['github/CODEOWNERS', '.github/CODEOWNERS']);
    templates.push([`github/workflows/qa-${argv['no-typescript'] ? 'js' : 'ts'}.yml`, '.github/workflows/qa.yml']);
  }

  // Library
  if (argv.package) {
    if (githubUsername) {
      packageInit.repository = { type: 'git', url: `https://github.com/${githubUsername}/<repo>` };
      packageInit.bugs = { url: `https://github.com/${githubUsername}/<repo>/issues/new` };

      templates.push(['github/workflows/release.yml', '.github/workflows/release.yml']);
    }

    templates.push(['releaserc.json', '.releaserc.json']);

    packageInit.publishConfig = { access: 'public' };
    packageInit.author = 'name <email>';

    // libraryDevelopment.push('@kettil/semantic-release-config');
  } else {
    delete packageUpdate.main;
    delete packageUpdate.type;
  }

  // CLI
  if (argv.cli) {
    folders.push('src/bin');
    templates.push([argv['no-typescript'] ? 'src/bin/index.js' : 'src/bin/index.ts']);
    packageBin[basename(argv.cwd)] = argv['no-typescript'] ? 'src/bin/index.js' : 'build/bin/index.js';
  }

  // Actions

  // NPM
  await spinnerAction(
    npmInit(argv, { packageBin, packageInit, packageUpdate, packageScripts }),
    'Create the package.json',
  );

  // GIT
  await spinnerAction(gitInit(argv, {}), 'Create the git repository');

  // FOLDER
  await spinnerAction(
    Promise.all(folders.map((folder) => nodeFolders(argv, { folder }))),
    'Create the project folders',
  );

  // FILES
  await spinnerAction(Promise.all(files.map((file) => nodeFiles(argv, { file }))), 'Create the project files');

  // TEMPLATES

  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  const variables = { GITHUB_USERNAME: githubUsername };

  await spinnerAction(
    Promise.all(templates.map(([source, target]) => nodeTemplate(argv, { source, target, variables }))),
    'Create template files',
  );

  // NPM INSTALL PROD
  await spinnerAction(npmInstall(argv, { packages: libraryProduction, mode: 'prod' }), 'Install prod dependencies');

  // NPM INSTALL DEV
  await spinnerAction(npmInstall(argv, { packages: libraryDevelopment, mode: 'dev' }), 'Install dev dependencies');

  if (!argv['no-commit']) {
    // GIT ADD
    await spinnerAction(gitAdd(argv, { files: ['.'] }), 'Add files to repository');

    // GIT COMMIT
    await spinnerAction(gitCommit(argv, { msg: 'feat: 🐣' }), 'Create the initial commit');
  }
};
