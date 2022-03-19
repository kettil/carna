import { accessSync, constants } from 'fs';
import { join } from 'path';

const getReadableFileOrUndefined = (
  path: string,
  filename: string,
  [extendsion, ...extendsions]: string[],
): string | undefined => {
  try {
    const file = join(path, `${filename}.${extendsion}`);

    accessSync(file, constants.R_OK);

    return file;
  } catch {
    if (extendsions.length > 0) {
      return getReadableFileOrUndefined(path, filename, extendsions);
    }

    return undefined;
  }
};

export { getReadableFileOrUndefined };
