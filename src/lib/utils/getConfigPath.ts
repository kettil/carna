import { babelConfigFiles } from '../../configs/actionConfigs';
import { FirstExistFileError } from '../errors/firstExistFileError';
import { getFirstExistingFile } from './getFirstExistingFile';

const getBabelConfigPath = async ({ cwd, root }: { cwd: string; root: string }): Promise<string> => {
  try {
    return await getFirstExistingFile({ cwd, files: babelConfigFiles });
  } catch (error) {
    if (error instanceof FirstExistFileError && root !== cwd) {
      return getFirstExistingFile({ cwd: root, files: babelConfigFiles });
    }

    throw error;
  }
};

export { getBabelConfigPath };
