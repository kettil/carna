import { isObject, objectKeys } from '@kettil/tool-lib';
import { writeFile } from '../../cmd/writeFile';
import { Action } from '../../types';
import { npmPackageLoadAction, getPackagePath } from './packageLoad';

type SettingProps = Record<string, Record<string, string> | string[] | boolean | number | string>;

type NpmPackageUpdateProps = {
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

const npmPackageUpdateAction: Action<NpmPackageUpdateProps> = async (
  argv,
  { settings: { bin, scripts, peerDependencies, ...settings } },
) => {
  const { cwd, log } = argv;

  const config = await npmPackageLoadAction(argv, {});

  if (!isObject(config)) {
    throw new TypeError('Package could not be interpreted as an object');
  }

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
  await writeFile(getPackagePath(cwd), config);
};

export type { NpmPackageUpdateProps };
export { npmPackageUpdateAction };
