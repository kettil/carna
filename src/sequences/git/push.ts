import eslint from '../../actions/tools/eslint';
import prettier, { extensionCi } from '../../actions/tools/prettier';
import tsc from '../../actions/tools/tsc';
import { Action } from '../../lib/types';

const push: Action = async (argv) => {
  await prettier(argv, { write: false, extension: extensionCi });
  await eslint(argv, { write: false });
  await tsc(argv, { mode: 'type-check' });
};

export default push;
