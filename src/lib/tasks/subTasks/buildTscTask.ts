import { basename } from 'path';
import { npmPackageLoadAction } from '../../actions/npm/packageLoad';
import { tscAction } from '../../actions/tools/tsc';
import { spinnerAction } from '../../cli/spinner';
import { PropsGlobal } from '../../types';

const buildTscTask =
  ({ argv, path }: { argv: PropsGlobal; path: string }) =>
    async (): Promise<void> => {
      const isPrivate = await npmPackageLoadAction(argv, { key: 'private', path });
      const subTitle = path === argv.cwd ? '' : `[${basename(path)}]`;

      if (isPrivate === true) {
        return Promise.resolve();
      }

      return spinnerAction(tscAction({ ...argv, cwd: path }, { mode: 'type-create' }), `Build: Typescript ${subTitle}`);
    };

export { buildTscTask };
