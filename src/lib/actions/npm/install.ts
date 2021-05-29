import { uniqueArray, compareAsc } from '@kettil/tool-lib';
import { exec } from '../../cmd/exec';
import { NpmInstallMode, Action } from '../../types';

type Props = {
  packages: string[];
  mode: NpmInstallMode;
};

const npmInstallAction: Action<Props> = async ({ cwd, log }, { packages, mode }) => {
  if (packages.length > 0) {
    const uniquePackages = uniqueArray(packages.sort(compareAsc));

    const parameters = ['install', `--save-${mode}`, '--save-exact', ...uniquePackages];
    const logPackages = uniquePackages.map((name) => `▸ ${name}`).join('\n');

    log.info(`Install following ${mode} packages:\n${logPackages}`);
    await exec({ cmd: 'npm', args: parameters, cwd, log });
  }
};

export { npmInstallAction };
