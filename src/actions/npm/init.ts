import { join } from 'path';
import access from '../../lib/cmd/access';
import exec from '../../lib/cmd/exec';
import { Action } from '../../lib/types';
import npmPackage, { Props as packageProps } from './package';

type Props = {
  settings: packageProps['settings'];
};

const npmInit: Action<Props> = async (argv, { settings }) => {
  const path = join(argv.cwd, 'package.json');
  const isExists = await access(path);

  if (!isExists) {
    argv.log.info('Initialize the package.json');
    await exec({ ...argv, cmd: 'npm', args: ['init', '-y'] });

    await npmPackage(argv, { settings });
  } else {
    argv.log.info('package.json already exists');
  }
};

export default npmInit;
