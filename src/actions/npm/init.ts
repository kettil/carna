import { join } from 'path';
import { isObject } from '@kettil/tool-lib';
import access from '../../lib/cmd/access';
import exec from '../../lib/cmd/exec';
import readFile from '../../lib/cmd/readFile';
import writeFile from '../../lib/cmd/writeFile';
import { Action } from '../../lib/types';

type Props = {
  packageBin: Record<string, string>;
  packageInit: Record<string, string | number | boolean | Record<string, string>>;
  packageUpdate: Record<string, string | number | boolean | Record<string, string>>;
  packageScripts: Record<string, string>;
};

const npmInit: Action<Props> = async ({ cwd, log }, { packageBin, packageInit, packageScripts, packageUpdate }) => {
  const path = join(cwd, 'package.json');
  const isExists = await access(path);

  if (!isExists) {
    log.info('Initialize the package.json');
    await exec({ cmd: 'npm', args: ['init', '-y'], cwd, log });
  } else {
    log.info('package.json already exists');
  }

  const config = await readFile(path, true);

  // Update only first run
  if (!isExists) {
    Object.assign(config, packageInit);

    if (Object.keys(packageBin).length > 0) {
      config.bin = Object.assign(isObject(config.bin) ? config.bin : {}, packageBin);
    }
  }

  // Update every run
  Object.assign(config, packageUpdate);

  // Update the scripts part; every run
  config.scripts = Object.assign(isObject(config.scripts) ? config.scripts : {}, packageScripts);

  log.info('Extend the package.json');
  await writeFile(path, config);
};

export default npmInit;
