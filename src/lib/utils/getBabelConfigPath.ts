import { babelConfigFiles } from '../../configs/actionConfigs';
import { FirstExistFileError } from '../errors/firstExistFileError';
import { getFirstExistingFile } from './getFirstExistingFile';

const getBabelConfigPath = async ([cwd, ...paths]: string[]): Promise<string> => {
  try {
    return await getFirstExistingFile({ cwd, files: babelConfigFiles });
  } catch (error: unknown) {
    if (error instanceof FirstExistFileError && paths.length > 0) {
      return getBabelConfigPath(paths);
    }

    throw error;
  }
};

export { getBabelConfigPath };
