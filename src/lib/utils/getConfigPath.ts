import { babelConfigFiles } from '../../configs/actionConfigs';
import { getFirstExistingFile } from './getFirstExistingFile';

const getBabelConfigPath = async ({ cwd }: { cwd: string }): Promise<string> =>
  getFirstExistingFile({ cwd, files: babelConfigFiles });

export { getBabelConfigPath };
