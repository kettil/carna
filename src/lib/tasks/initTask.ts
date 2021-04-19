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
import npmPackageUpdate from '../actions/npm/packageUpdate';
import { spinnerAction } from '../cli/spinner';
import access from '../cmd/access';
import exec from '../cmd/exec';
import { Action } from '../types';
import getInitSettings, { InitSettingProps } from './helpers/getInitSettings';
import getTemplateVariables from './helpers/getInitTemplateVariables';

export type InitProps = InitSettingProps;

const initTask: Action<InitProps> = async (argv, props) => {
  const hasGitFolder = await access(join(argv.cwd, '.git'));
  const hasPackage = await access(join(argv.cwd, 'package.json'));
  const settings = getInitSettings(props);

  if (hasPackage) {
    throw new Error('The project is already initialized');
  }

  // npm init
  await spinnerAction(npmInit(argv, { settings: settings.packageInit }), 'Create the package.json');

  const packageName = await npmPackageLoad(argv, { key: 'name' });

  if (typeof packageName !== 'string') {
    throw new TypeError('Package name could not be read');
  }

  settings.packageUpdate.main = `build/${packageName}.js`;

  if (props.cli) {
    settings.packageBin[packageName] = 'build/bin/index.js';
  }

  // git init
  await spinnerAction(gitInit(argv), 'Create the git repository');

  // create folders and files
  await spinnerAction(
    Promise.all(settings.folders.map((folder) => nodeFolder(argv, { folder }))),
    'Create the project folders',
  );

  await spinnerAction(Promise.all(settings.files.map((file) => nodeFile(argv, { file }))), 'Create the project files');

  // create template files
  const templateVariables = getTemplateVariables(props, settings, packageName);

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
    npmPackageUpdate(argv, {
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

  if (!props.noCommit && !hasGitFolder) {
    // git add
    await spinnerAction(gitAdd(argv, { files: ['.'] }), 'Add files to repository');

    // git commit
    await spinnerAction(gitCommit(argv, { msg: 'feat: 🐣' }), 'Create the initial commit');
  }
};

export default initTask;
