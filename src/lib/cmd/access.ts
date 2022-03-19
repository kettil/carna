import { constants, promises } from 'fs';
import { isObject } from '@kettil/tool-lib';

const access = async (path: string, type: 'exists' | 'readable' | 'writable' = 'exists'): Promise<boolean> => {
  let mode;

  switch (type) {
    case 'readable':
      // eslint-disable-next-line no-bitwise -- is needed for file handling
      mode = constants.F_OK | constants.R_OK;
      break;

    case 'writable':
      // eslint-disable-next-line no-bitwise -- is needed for file handling
      mode = constants.F_OK | constants.W_OK;
      break;

    default:
      mode = constants.F_OK;
  }

  try {
    await promises.access(path, mode);

    return true;
  } catch (error: unknown) {
    if (!isObject(error) || (error.code !== 'ENOENT' && error.syscall !== 'access')) {
      throw error;
    }

    return false;
  }
};

export { access };
