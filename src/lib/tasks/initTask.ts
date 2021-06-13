/* eslint-disable import/max-dependencies -- task has many subtasks */
import { join } from 'path';
import { gitAddAction } from '../actions/git/add';
import { gitCommitAction } from '../actions/git/commit';
import { gitInitAction } from '../actions/git/init';
import { nodeFileAction } from '../actions/node/file';
import { nodeFolderAction } from '../actions/node/folder';
import { nodeTemplateAction } from '../actions/node/template';
import { npmInitAction } from '../actions/npm/init';
import { npmInstallAction } from '../actions/npm/install';
import { npmPackageLoadAction } from '../actions/npm/packageLoad';
import { npmPackageUpdateAction } from '../actions/npm/packageUpdate';
import { spinnerAction } from '../cli/spinner';
import { access } from '../cmd/access';
import { exec } from '../cmd/exec';
import { Action } from '../types';
import { getInitTaskSettings, InitSettingProps } from '../utils/getInitTaskSettings';
import { getInitTaskTemplateVariables } from '../utils/getInitTaskTemplateVariables';

type InitProps = InitSettingProps;

const initTask: Action<InitProps> = async (argv, props) => {
  const hasGitFolder = await access(join(argv.cwd, '.git'));
  const settings = getInitTaskSettings(props);

  // npm init
  await spinnerAction(npmInitAction(argv, { settings: settings.packageInit }), 'Create the package.json');

  const packageName = await npmPackageLoadAction(argv, { key: 'name' });

  if (typeof packageName !== 'string') {
    throw new TypeError('Package name could not be read');
  }

  if (props.cli) {
    settings.packageBin[packageName] = 'build/bin/index.js';
  }

  // git init
  await spinnerAction(gitInitAction(argv), 'Create the git repository');

  // create folders and files
  await spinnerAction(
    Promise.all(settings.folders.map((folder) => nodeFolderAction(argv, { folder }))),
    'Create the project folders',
  );

  await spinnerAction(
    Promise.all(settings.files.map((file) => nodeFileAction(argv, { file }))),
    'Create the project files',
  );

  // create template files
  const templateVariables = getInitTaskTemplateVariables(settings);

  await spinnerAction(
    Promise.all(
      settings.templates.map(([source, target]) =>
        nodeTemplateAction(argv, { source, target, variables: templateVariables }),
      ),
    ),
    'Create template files',
  );

  // npm install
  await spinnerAction(
    npmInstallAction(argv, { packages: settings.libraryProduction, mode: 'prod' }),
    'Install prod dependencies',
  );

  await spinnerAction(
    npmInstallAction(argv, { packages: settings.libraryDevelopment, mode: 'dev' }),
    'Install dev dependencies',
  );

  // update package.json with settings
  await spinnerAction(
    npmPackageUpdateAction(argv, {
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
    await spinnerAction(gitAddAction(argv, { files: ['.'] }), 'Add files to repository');

    // git commit
    await spinnerAction(gitCommitAction(argv, { msg: 'feat: 🐣' }), 'Create the initial commit');
  }
};

export type { InitProps };
export { initTask };
