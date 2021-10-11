import { existFiles } from '../cmd/existFiles';
import { FirstExistFileError } from '../errors/firstExistFileError';

type Props = {
  cwd: string;
  files: Array<string | undefined>;
  defaultFile?: string;
};

const getFirstExistingFile = async ({ cwd, files, defaultFile }: Props): Promise<string> => {
  const filteredFiles = files.filter((file): file is string => typeof file === 'string');
  const checkedFiles = await existFiles(filteredFiles, cwd);

  if (checkedFiles.length === 0) {
    if (typeof defaultFile === 'string') {
      return defaultFile;
    }

    throw new FirstExistFileError(`None of the following files were found: ${files.join(', ')}`);
  }

  return checkedFiles[0];
};

export { getFirstExistingFile };
