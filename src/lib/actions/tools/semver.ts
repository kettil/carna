import { compareTransformAsc, isObject } from '@kettil/tool-lib';
import { red } from 'chalk';
import { TableError } from '../../errors/tableError';
import { Action } from '../../types';
import { npmPackageLoadAction } from '../npm/packageLoad';
import { SemverActionProps } from '../types';
import { getInaccurateVersions } from './utils/getInaccurateVersions';

const keys = ['dependencies', 'devDependencies'] as const;

const semverAction: Action<SemverActionProps> = async (argv, { path }) => {
  const packagesJson = await npmPackageLoadAction(argv, { path });

  if (!isObject(packagesJson)) {
    throw new Error('The package.json was not found');
  }

  const packages = keys
    .flatMap((key) => getInaccurateVersions(packagesJson[key]))
    .sort(compareTransformAsc(([name]) => name))
    .map<[string, string, string, string]>((value, index) => [`${index + 1}`, ...value]);

  if (packages.length > 0) {
    packages.unshift([red('#'), red('Package'), red('Version'), red('Expected')]);

    throw new TableError('Packages with inaccurate version found', packages);
  }
};

export { semverAction };
