import { join, relative } from 'path';
import { isArray } from '@kettil/tool-lib';
import exec from '../../cmd/exec';
import existFiles from '../../cmd/existFiles';
import { Action } from '../../types';

export type Props = {
  project?: string[] | string;
  updateSnapshot?: boolean;
  runInBand?: boolean;
  watch?: boolean;
  ci?: boolean;
};

const configFiles = ['jest.config.js', 'jest.config.ts'];
const configCiFiles = ['jest.ci.js', 'jest.ci.ts', ...configFiles];
const options: Array<keyof Props> = ['ci', 'updateSnapshot', 'runInBand', 'watch'];

const jest: Action<Props> = async ({ cwd, cfg, log }, props) => {
  const files = await existFiles(props.ci ? configCiFiles : configFiles, cwd);

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

  log.info('Run test');

  const { stdout } = await exec({ cmd, args, cwd, log, withInteraction: props.watch, withDirectOutput: props.ci });

  if (stdout.trim() !== '') {
    log.log('');
    log.log(stdout);
    log.log('');
  }
};

export default jest;
