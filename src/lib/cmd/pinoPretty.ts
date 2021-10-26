import { ChildProcessByStdio } from 'child_process';
import { join } from 'path';
import { Writable } from 'stream';
import { babelPinoPretty } from '../../configs/actionConfigs';
import { Logger } from '../cli/logger';
import { exec } from './exec';

type Props = {
  log: Logger;
  root: string;
  cwd: string;
};

const pinoPretty = ({ log, root, cwd }: Props): ChildProcessByStdio<Writable, null, null> =>
  exec(
    {
      log,
      args: [
        '--colorize',
        '--translateTime',
        '"SYS:yyyy-mm-dd\'T\'HH:MM:ss.l"',
        '--ignore',
        `"${['pid', 'hostname'].join(',')}"`,
      ],
      cmd: join(root, babelPinoPretty),
      cwd,
    },
    { stdin: undefined, stderr: process.stderr, stdout: process.stdout },
  );

export { pinoPretty };
