import { join } from 'path';
import { jestConfigFiles } from '../../../configs/actionConfigs';
import { exec } from '../../cmd/exec';
import { Action } from '../../types';
import { getCoverageFolder } from '../../utils/getCoverageFolder';
import { getFirstExistingFile } from '../../utils/getFirstExistingFile';
import { JestActionProps } from '../types';

const options: Array<keyof JestActionProps> = ['updateSnapshot', 'runInBand', 'watch', 'verbose'];

const jestAction: Action<JestActionProps> = async ({ cwd, ci, log }, props) => {
  const coverageFolder = getCoverageFolder(cwd, props.projects);
  const configFile = await getFirstExistingFile({ cwd, files: jestConfigFiles });

  const cmd = './node_modules/.bin/jest';
  const args: string[] = ['--config', configFile, '--colors'];

  if (props.projects.length === 1) {
    args.push('--selectProjects', props.projects[0]);
  } else if (props.projects.length > 1) {
    args.push('--selectProjects', ...props.projects);
  }

  options.forEach((option) => {
    if (props[option] === true) {
      args.push(`--${option}`);
    }
  });

  if (!props.runInBand) {
    // see https://ivantanev.com/make-jest-faster
    if (props.watch) {
      args.push('--maxWorkers', '25%');
    } else {
      args.push('--maxWorkers', '50%');
    }
  }

  if (ci) {
    args.push('--ci');
    args.push('--silent');
    args.push('--json');
    args.push('--outputFile', join(coverageFolder, 'jest-final.json'));
  }

  args.push('--coverage');
  args.push('--coverageDirectory', coverageFolder);
  args.push('--coverageReporters', 'json');
  args.push('--coverageThreshold', '\'{"global":{"statements":0,"branches":0,"functions":0,"lines":0}}\'');

  if (props.watch) {
    args.push('--coverageReporters', 'json-summary');
    args.push('--coverageReporters', 'lcovonly');
    args.push('--coverageReporters', 'html');
  }

  log.info('Run test');

  await exec({ cmd, args, cwd, log, withInteraction: props.watch, withDirectOutput: true });
};

export { jestAction };
