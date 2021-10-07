import { getReadableFileOrUndefined } from './getReadableFileOrUndefined';

const getSetupFilesAfterEnvironment = (path: string, filenames: string[]): string[] =>
  filenames
    .map((filename) => getReadableFileOrUndefined(path, filename, ['ts', 'js']))
    .filter((file): file is string => typeof file === 'string');

export { getSetupFilesAfterEnvironment };
