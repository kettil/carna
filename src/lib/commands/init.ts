import { join } from 'path';
import gitAdd from '../actions/git/add';
import gitCommit from '../actions/git/commit';
import gitInit from '../actions/git/init';
import nodeFile from '../actions/node/file';
import nodeFolder from '../actions/node/folder';
import nodeTemplate from '../actions/node/template';
import npmInit from '../actions/npm/init';
import npmInstall from '../actions/npm/install';
import npmPackageLoad from '../actions/npm/packageLoad';
import npmPackage from '../actions/npm/packageUpdate';
import { spinnerAction } from '../cli/spinner';
import {
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  CommandModuleBuilder,
  errorHandler,
  commonHandler,
} from '../cli/yargs';
import access from '../cmd/access';
import exec from '../cmd/exec';
import getSettings, { Props } from './init/getSettings';
import getTemplateVariables from './init/getTemplateVariables';

export const command: CommandModuleCommand = 'init';
export const desc: CommandModuleDescribe = 'Initializes the project';

const args = { type: 'boolean', default: false, group: `${command}-Options:` } as const;

export const builder: CommandModuleBuilder<Props> = builderDefault(command, (yargs) =>
  yargs.options({
    package: { ...args, alias: 'p', desc: 'Project is created as a package' },
    cli: { ...args, alias: 'c', implies: 'package', desc: 'Extends the package with CLI features' },
    github: { type: 'string', desc: 'Github username', group: `${command}-Options:` },

    // conflict with cli
    // react: { ...args, alias: 'r', default: undefined, desc: 'React will be installed', },

    noCommit: { ...args, desc: 'No initial commit is executed at the end' },
  }),
);

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await commonHandler(argv, true);

    const hasPackage = await access(join(argv.cwd, 'package.json'));

    if (hasPackage) {
      throw new Error('The project is already initialized');
    }

    const hasGitFolder = await access(join(argv.cwd, '.git'));
    const settings = getSettings(argv);

    // npm init
    await spinnerAction(npmInit(argv, { settings: settings.packageInit }), 'Create the package.json');

    const packageName = await npmPackageLoad(argv, { key: 'name', throwError: true });

    if (typeof packageName !== 'string') {
      throw new TypeError('Package name could not be read');
    }

    settings.packageUpdate.main = `build/${packageName}.js`;

    if (argv.cli) {
      settings.packageBin[packageName] = 'build/bin/index.js';
    }

    // git init
    await spinnerAction(gitInit(argv), 'Create the git repository');

    // create folders and files
    await spinnerAction(
      Promise.all(settings.folders.map((folder) => nodeFolder(argv, { folder }))),
      'Create the project folders',
    );

    await spinnerAction(
      Promise.all(settings.files.map((file) => nodeFile(argv, { file }))),
      'Create the project files',
    );

    // create template files
    const templateVariables = getTemplateVariables(argv, settings, packageName);

    await spinnerAction(
      Promise.all(
        settings.templates.map(([source, target]) =>
          nodeTemplate(argv, { source, target, variables: templateVariables }),
        ),
      ),
      'Create template files',
    );

    // npm install
    await spinnerAction(
      npmInstall(argv, { packages: settings.libraryProduction, mode: 'prod' }),
      'Install prod dependencies',
    );

    await spinnerAction(
      npmInstall(argv, { packages: settings.libraryDevelopment, mode: 'dev' }),
      'Install dev dependencies',
    );

    // update package.json with settings
    await spinnerAction(
      npmPackage(argv, {
        settings: {
          ...settings.packageUpdate,
          bin: settings.packageBin,
          scripts: settings.packageScripts,
          peerDependencies: settings.packagePeerDependencies,
        },
      }),
      'Update the package.json',
    );

    // install package.json "prepare" command
    if (typeof settings.packageScripts.prepare === 'string') {
      await spinnerAction(
        exec({ cmd: 'npm', args: ['run', 'prepare'], cwd: argv.cwd, log: argv.log }),
        'Enable git hooks handling',
      );
    }

    if (!argv.noCommit && !hasGitFolder) {
      // git add
      await spinnerAction(gitAdd(argv, { files: ['.'] }), 'Add files to repository');

      // git commit
      await spinnerAction(gitCommit(argv, { msg: 'feat: 🐣' }), 'Create the initial commit');
    }
  } catch (error) {
    errorHandler(argv, error);
  }
};
