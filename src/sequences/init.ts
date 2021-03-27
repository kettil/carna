import { join } from 'path';
import gitAdd from '../actions/git/add';
import gitCommit from '../actions/git/commit';
import gitInit from '../actions/git/init';
import npmInit from '../actions/npm/init';
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
import dependencieAction from './init/dependencie';
import ioAction from './init/io';
import getSettings, { Props } from './init/settings';
import templateAction from './init/template';

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

export const handler: CommandModuleHandler<Props> = async (argv) => {
  try {
    await logo();

    const hasGitFolder = await access(join(argv.cwd, '.git'));

    const options = getSettings(argv);

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

    await spinnerAction(gitInit(argv), 'Create the git repository');

    await ioAction(argv, options);
    await templateAction(argv, options, packageName);
    await dependencieAction(argv, options);

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
