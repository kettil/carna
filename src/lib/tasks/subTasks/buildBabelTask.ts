import { basename } from 'path';
import { babelAction } from '../../actions/tools/babel';
import { spinnerAction } from '../../cli/spinner';
import type { PropsGlobal } from '../../types';

const buildBabelTask =
  ({ argv, path }: { argv: PropsGlobal; path: string }) =>
    async (): Promise<void> => {
      const subTitle = path === argv.cwd ? '' : `[${basename(path)}]`;

      return spinnerAction(babelAction({ ...argv, cwd: path }, {}), `Build: Babel ${subTitle}`);
    };

export { buildBabelTask };
