import { isString } from '@kettil/tools';
import { getReadableFileOrUndefined } from './getReadableFileOrUndefined';

const getSetupFilesAfterEnvironment = (path: string, filenames: string[]): string[] =>
  filenames.map((filename) => getReadableFileOrUndefined(path, filename, ['ts', 'js'])).filter(isString);

export { getSetupFilesAfterEnvironment };
