import { join } from 'path';
import exec from '../../cmd/exec';
import existFiles from '../../cmd/existFiles';
import { Action } from '../../types';

export type JestProps = {
  projects: string[];
  updateSnapshot?: boolean;
  runInBand?: boolean;
  watch?: boolean;
};

const configFiles = ['jest.config.js', 'jest.config.ts'];
const options: Array<keyof JestProps> = ['updateSnapshot', 'runInBand', 'watch'];

export const getCoverageFolder = (cwd: string, projects: JestProps['projects']): string =>
  join(cwd, 'coverage', projects.length === 1 ? `_${projects}` : '');

const jest: Action<JestProps> = async ({ cwd, ci, log }, props) => {
  const coverageFolder = getCoverageFolder(cwd, props.projects);
  const files = await existFiles(configFiles, cwd);

  if (files.length === 0) {
    throw new Error('Jest config file was not found');
  }

  const cmd = './node_modules/.bin/jest';
  const args: string[] = ['--colors', '--config', files[0]];

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
    if (ci) {
      args.push('--runInBand');
    } else if (props.watch) {
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

export default jest;
