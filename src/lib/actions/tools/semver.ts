import { compareTransformAsc, isObject, objectEntries } from '@kettil/tool-lib';
import { red } from 'chalk';
import { coerce } from 'semver';
import TableError from '../../errors/tableError';
import { Action } from '../../types';
import npmPackageLoad from '../npm/packageLoad';

const keys = ['dependencies', 'devDependencies'] as const;

const getInaccurateVersions = (packages: unknown): Array<[string, string, string]> => {
  if (!isObject(packages)) {
    return [];
  }

  return objectEntries(packages)
    .filter((value): value is readonly [string, string] => typeof value[1] === 'string')
    .filter(([, version]) => !version.startsWith('file'))
    .filter(([, version]) => !version.startsWith('http'))
    .filter(([, version]) => !version.startsWith('git'))
    .map<[string, string, string]>(([name, version]) => [
      name,
      version,
      coerce(version)?.version ?? 'could not be detected',
    ])
    .filter(([, version, result]) => version !== result);
};

const semver: Action = async (argv) => {
  const packagesJson = await npmPackageLoad(argv, {});

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

export default semver;

/*
const p: Record<string, string> = {
  a: '1.0.0 - 2.9999.9999',
  b: '>=1.0.2 <2.1.2',
  c: '>1.0.2 <=2.3.4',
  d: '2.0.1',
  e: '<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0',
  f: 'http://asdf.com/asdf.tar.gz',
  g: '~1.2',
  h: '~1.2.3',
  i: '2.x',
  j: '3.3.x',
  k: 'latest',
  l: 'file:../dyl',
  m: 'git://github.com/npm/cli.git',
};
*/
