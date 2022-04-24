import { basename } from 'path';
import { packageLintAction } from '../../actions/tools/packageLint';
import { spinnerAction } from '../../cli/spinner';
import type { Task } from '../../types';
import { getPackageLintMode } from '../../utils/getPackageLintMode';

type ManagePackageLintProps = {
  workspacePaths: string[];
};

const managePackageLintTask: Task<ManagePackageLintProps> = async (argv, { workspacePaths }) => {
  await [argv.root, ...workspacePaths].reduce(async (promise, path) => {
    await promise;

    const mode = await getPackageLintMode({ argv, path, workspacePaths });
    const subTitle = path === argv.root ? '' : `[${basename(path)}]`;

    await spinnerAction(packageLintAction(argv, { mode, path }), `package.json verification ${subTitle}`);
  }, Promise.resolve());
};

export { managePackageLintTask };
