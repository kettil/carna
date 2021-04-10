import npmInstall from '../../actions/npm/install';
import { spinnerAction } from '../../cli/spinner';
import { PropsGlobal } from '../../types';
import { Props, Settings } from './settings';

const dependencieAction = async (argv: Props & PropsGlobal, settings: Settings): Promise<void> => {
  await spinnerAction(
    npmInstall(argv, { packages: settings.libraryProduction, mode: 'prod' }),
    'Install prod dependencies',
  );

  await spinnerAction(
    npmInstall(argv, { packages: settings.libraryDevelopment, mode: 'dev' }),
    'Install dev dependencies',
  );
};

export default dependencieAction;
