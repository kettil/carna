import { isObject, objectEntries } from '@kettil/tool-lib';
import { coerce } from 'semver';

const regexpPostfix = /\d+\.\d+\.\d+[.-][\d.a-z-]+/i;

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
    .filter(([, version, result]) => version !== result)
    .filter(([, version]) => !regexpPostfix.test(version));
};

export { getInaccurateVersions };