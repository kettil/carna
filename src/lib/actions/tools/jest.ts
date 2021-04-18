import { join, relative } from 'path';
import { isArray } from '@kettil/tool-lib';
import exec from '../../cmd/exec';
import existFiles from '../../cmd/existFiles';
import { Action } from '../../types';

export type JestProps = {
  project?: string[] | string;
  updateSnapshot?: boolean;
  runInBand?: boolean;
  watch?: boolean;
};

const configFiles = ['jest.config.js', 'jest.config.ts'];
const options: Array<keyof JestProps> = ['updateSnapshot', 'runInBand', 'watch'];

const jest: Action<JestProps> = async ({ cwd, cfg, ci, log }, props) => {
  const files = await existFiles(configFiles, cwd);

  files.push(relative(cwd, join(cfg, 'jest.config.js')));

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

  if (ci) {
    args.push('--ci');
    args.push('--verbose');
    args.push('--coverage');
    // args.push('--no-coverage');
    args.push('--coverageReporters', 'text');
    args.push('--coverageReporters', 'text-summary');
  }

  // args.push('--coverageThreshold', `'{"global":{"statements":0,"branches":0,"functions":0,"lines":0}}'`);

  log.info('Run test');

  const { stdout } = await exec({ cmd, args, cwd, log, withInteraction: props.watch, withDirectOutput: ci });

  if (stdout.trim() !== '') {
    log.log('');
    log.log(stdout);
    log.log('');
  }
};

export default jest;
