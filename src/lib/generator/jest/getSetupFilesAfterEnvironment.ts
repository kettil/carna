import { isString } from '@kettil/tool-lib';
import { getReadableFileOrUndefined } from './getReadableFileOrUndefined';

const getSetupFilesAfterEnvironment = (path: string, filenames: string[]): string[] =>
  filenames.map((filename) => getReadableFileOrUndefined(path, filename, ['ts', 'js'])).filter(isString);

export { getSetupFilesAfterEnvironment };
