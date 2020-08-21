import { uniqueArray, compareAsc } from '@kettil/tool-lib';
import exec from '../../lib/cmd/exec';
import { NpmInstallMode, Action } from '../../lib/types';

type Props = {
  packages: string[];
  mode: NpmInstallMode;
};

const npmInstall: Action<Props> = async ({ cwd, log }, { packages, mode }) => {
  if (packages.length > 0) {
    const uniquePackages = uniqueArray(packages.sort(compareAsc));

    const parameters = ['install', ...uniquePackages, `--save-${mode}`];
    const logPackages = uniquePackages.map((name) => `▸ ${name}`).join('\n');

    log.info(`Install following ${mode} packages:\n${logPackages}`);
    await exec({ cmd: 'npm', args: parameters, cwd, log });
  }
};

export default npmInstall;
