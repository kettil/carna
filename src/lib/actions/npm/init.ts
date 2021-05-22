import { join } from 'path';
import access from '../../cmd/access';
import exec from '../../cmd/exec';
import { Action } from '../../types';
import npmPackageUpdate, { Props as packageProps } from './packageUpdate';

type Props = {
  settings: packageProps['settings'];
};

const npmInit: Action<Props> = async (argv, { settings }) => {
  const path = join(argv.cwd, 'package.json');
  const isExists = await access(path);

  if (!isExists) {
    argv.log.info('Initialize the package.json');
    await exec({ ...argv, cmd: 'npm', args: ['init', '-y'] });

    await npmPackageUpdate(argv, { settings });
  } else {
    argv.log.info('package.json already exists');
  }
};

export default npmInit;
