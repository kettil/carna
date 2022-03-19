import { isString } from '@kettil/tool-lib';
import { existFiles } from '../cmd/existFiles';
import { FirstExistFileError } from '../errors/firstExistFileError';

type Props = {
  cwd: string;
  files: Array<string | undefined>;
  defaultFile?: string;
};

const getFirstExistingFile = async ({ cwd, files, defaultFile }: Props): Promise<string> => {
  const filteredFiles = files.filter(isString);
  const checkedFiles = await existFiles(filteredFiles, cwd);
  const file = checkedFiles.at(0);

  if (isString(file)) {
    return file;
  }

  if (isString(defaultFile)) {
    return defaultFile;
  }

  throw new FirstExistFileError(`None of the following files were found: ${files.join(', ')}`);
};

export { getFirstExistingFile };
