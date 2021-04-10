import nodeFiles from '../../actions/node/file';
import nodeFolders from '../../actions/node/folder';
import { spinnerAction } from '../../cli/spinner';
import { PropsGlobal } from '../../types';
import { Props, Settings } from './settings';

const ioAction = async (argv: Props & PropsGlobal, settings: Settings): Promise<void> => {
  await spinnerAction(
    Promise.all(settings.folders.map((folder) => nodeFolders(argv, { folder }))),
    'Create the project folders',
  );

  await spinnerAction(Promise.all(settings.files.map((file) => nodeFiles(argv, { file }))), 'Create the project files');
};

export default ioAction;
