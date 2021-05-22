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
      ['carnarc.json', '.carnarc.json'],
      ['editorconfig', '.editorconfig'],
      ['eslintignore', '.eslintignore'],
      ['gitignore', '.gitignore'],
      ['npmignore', '.npmignore'],
      ['prettierignore', '.prettierignore'],
      ['babel.config.js'],
    ],

    libraryProduction: [],
    libraryDevelopment: ['carna'],

    packageBin: {},
    packageInit: {
      private: true,
      version: '0.1.0',
      engines: { node: '>=14', npm: '>=6' },
      author: 'name <email>',
    },
    packageUpdate: {
      main: 'build/index.js',
    },
    packageScripts: {
      prepare: '[ "$CI" != "" ] || husky install ./node_modules/carna/configs/husky',
      analyse: 'npx carna analyse',
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
    settings.folders.push('.github', '.github/workflows', '.github/ISSUE_TEMPLATE');

    settings.templates.push(['github/dependabot.yml', '.github/dependabot.yml']);
    settings.templates.push(['github/CODEOWNERS', '.github/CODEOWNERS']);
    settings.templates.push(['github/workflows/qa.yml', '.github/workflows/qa.yml']);

    settings.templates.push(['github/ISSUE_TEMPLATE/bug.md', '.github/ISSUE_TEMPLATE/bug.md']);
    settings.templates.push(['github/ISSUE_TEMPLATE/concept.md', '.github/ISSUE_TEMPLATE/concept.md']);
    settings.templates.push(['github/ISSUE_TEMPLATE/epic.md', '.github/ISSUE_TEMPLATE/epic.md']);
    settings.templates.push(['github/ISSUE_TEMPLATE/feature.md', '.github/ISSUE_TEMPLATE/feature.md']);
    settings.templates.push(['github/ISSUE_TEMPLATE/question.md', '.github/ISSUE_TEMPLATE/question.md']);
    settings.templates.push(['github/ISSUE_TEMPLATE/task.md', '.github/ISSUE_TEMPLATE/task.md']);
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
  // # Typescript         #
  // ######################

  settings.files.push('src/index.ts', 'src/lib/types.ts');

  settings.templates.push(['typescriptrc.json', 'tsconfig.json']);
  settings.templates.push(['typescriptrc.build.json', 'tsconfig.build.json']);

  settings.libraryDevelopment.push('@types/node', 'typescript');

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

  settings.files.push('tests/shared/.keep', 'tests/type/.keep');
  settings.folders.push('tests/shared', 'tests/type', 'tests/unit', 'tests/integration', 'tests/e2e');

  settings.templates.push(
    ['tests/dummy.test.ts', 'tests/unit/dummy.test.ts'],
    ['tests/dummy.test.ts', 'tests/integration/dummy.test.ts'],
    ['tests/dummy.test.ts', 'tests/e2e/dummy.test.ts'],

    ['tests/pre.ts', 'tests/integration/pre.ts'],
    ['tests/post.ts', 'tests/integration/post.ts'],
    ['tests/pre.ts', 'tests/e2e/pre.ts'],
    ['tests/post.ts', 'tests/e2e/post.ts'],
  );

  settings.packageScripts.test = 'npx carna test';
  settings.packageScripts['test:watch'] = 'npx carna test -w';

  return settings;
};

export default getInitSettings;
