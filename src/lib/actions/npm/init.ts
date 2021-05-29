import { join } from 'path';
import { access } from '../../cmd/access';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { npmPackageUpdateAction, NpmPackageUpdateProps } from './packageUpdate';

type Props = {
  settings: NpmPackageUpdateProps['settings'];
};

const npmInitAction: Action<Props> = async (argv, { settings }) => {
  const path = join(argv.cwd, 'package.json');
  const isExists = await access(path);

  if (!isExists) {
    argv.log.info('Initialize the package.json');
    await exec({ ...argv, cmd: 'npm', args: ['init', '-y'] });

    await npmPackageUpdateAction(argv, { settings });
  } else {
    argv.log.info('package.json already exists');
  }
};

export { npmInitAction };
