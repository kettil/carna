import { join } from 'path';
import { isObject, objectKeys } from '@kettil/tool-lib';
import access from '../../lib/cmd/access';
import readFile from '../../lib/cmd/readFile';
import writeFile from '../../lib/cmd/writeFile';
import { Action } from '../../lib/types';

type SettingProps = Record<string, string | string[] | number | boolean | Record<string, string>>;

export type Props = {
  settings: SettingProps & {
    scripts?: Record<string, string>;
    bin?: Record<string, string>;
    peerDependencies?: string[];
  };
};

const update = (config: unknown, values: SettingProps) => {
  if (objectKeys(values).length === 0) {
    return config;
  }

  return Object.assign(isObject(config) ? config : {}, values);
};

const updatePeerDependencies = (config: Record<string, unknown>, values: string[]) => {
  const peerDependencies: Record<string, string> = {};
  const packages = config.devDependencies;

  if (!isObject(packages)) {
    throw new Error('In the package.json is the devDependencies empty');
  }

  values.forEach((value) => {
    const version = packages[value];

    if (typeof version !== 'string') {
      throw new TypeError(`The peerDependency "${value}" is not found in the devDependencies`);
    }

    peerDependencies[value] = version;
  });

  return update(config.peerDependencies, peerDependencies);
};

const npmPackage: Action<Props> = async (
  { cwd, log },
  { settings: { bin, scripts, peerDependencies, ...settings } },
) => {
  const path = join(cwd, 'package.json');
  const isExists = await access(path);

  if (!isExists) {
    throw new Error('package.json is not found');
  }

  const config = await readFile(path, true);

  Object.assign(config, settings);

  // Update the bin part
  if (bin) {
    config.bin = update(config.bin, bin);
  }

  // Update the scripts part
  if (scripts) {
    config.scripts = update(config.scripts, scripts);
  }

  // Update the peerDependencies part
  if (peerDependencies && peerDependencies.length > 0) {
    config.peerDependencies = updatePeerDependencies(config, peerDependencies);
  }

  log.info('Extend the package.json');
  await writeFile(path, config);
};

export default npmPackage;
