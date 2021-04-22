import { join } from 'path';
import { isArray } from '@kettil/tool-lib';
import exec from '../../cmd/exec';
import existFiles from '../../cmd/existFiles';
import { Action } from '../../types';

export type JestProps = {
  project?: string[] | string;
  projectList?: string[];
  updateSnapshot?: boolean;
  runInBand?: boolean;
  coverage?: boolean;
  watch?: boolean;
};

export const coverageFolderName = 'coverage';

const configFiles = ['jest.config.js', 'jest.config.ts'];
const options: Array<keyof JestProps> = ['updateSnapshot', 'runInBand', 'watch'];

const jest: Action<JestProps> = async ({ cwd, ci, log }, props) => {
  const coverageFolder = join(cwd, coverageFolderName);
  const files = await existFiles(configFiles, cwd);

  if (files.length === 0) {
    throw new Error('Jest config file was not found');
  }

  const cmd = './node_modules/.bin/jest';
  const args: string[] = ['--colors', '--config', files[0]];

  if (typeof props.project === 'string') {
    args.push('--selectProjects', props.project);
  } else if (isArray(props.project)) {
    args.push('--selectProjects', ...props.project);
  }

  options.forEach((option) => {
    if (props[option] === true) {
      args.push(`--${option}`);
    }
  });

  if (ci && props.coverage) {
    args.push('--ci');
    args.push('--silent');
    args.push('--coverage');
    args.push('--coverageDirectory', coverageFolder);
    // args.push('--coverageReporters', 'text');
    args.push('--coverageReporters', 'text-summary');
    args.push('--coverageReporters', 'json-summary');
  } else if (ci && !props.coverage) {
    args.push('--ci');
    args.push('--no-coverage');

    if (typeof props.project === 'string' && isArray(props.projectList) && props.projectList.length > 0) {
      const projectIndex = props.projectList.indexOf(props.project) + 1;

      // Also outputs the test result as JSON so that it
      // can be further interpreted (e.g. as a comment in PR/MR)
      args.push('--json');
      args.push('--outputFile', join(coverageFolder, `jest-project-${projectIndex}-${props.project}-summary.json`));
    }
  } else if (!ci && !props.coverage) {
    args.push('--coverage');
    args.push('--coverageDirectory', coverageFolder);
    args.push('--coverageThreshold', '\'{"global":{"statements":0,"branches":0,"functions":0,"lines":0}}\'');
  }

  log.info('Run test');

  const { stdout } = await exec({ cmd, args, cwd, log, withInteraction: props.watch, withDirectOutput: ci });

  if (stdout.trim() !== '') {
    log.log('');
    log.log(stdout);
    log.log('');
  }
};

export default jest;
