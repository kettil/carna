import { typescriptBuildConfigFiles, typescriptConfigFiles } from '../../configs/actionConfigs';
import type { TscActionProps } from '../actions/types';
import { getFirstExistingFile } from './getFirstExistingFile';

const getTypescriptConfigPath = async (cwd: string, mode: TscActionProps['mode']): Promise<string> =>
  getFirstExistingFile({ cwd, files: mode === 'type-create' ? typescriptBuildConfigFiles : typescriptConfigFiles });

export { getTypescriptConfigPath };
