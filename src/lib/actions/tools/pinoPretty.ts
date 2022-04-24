import type { ChildProcessByStdio } from 'child_process';
import { join } from 'path';
import type { Writable } from 'stream';
import { uniqueArray } from '@kettil/tools';
import { pinoPrettyCommand, pinoPrettyIgnoreKeys } from '../../../configs/actionConfigs';
import type { Logger } from '../../cli/logger';
import { exec } from '../../cmd/exec';

type Props = {
  log: Logger;
  root: string;
  cwd: string;
  pinoIgnoreKeys?: string[];
};

const pinoPretty = ({ log, root, cwd, pinoIgnoreKeys = [] }: Props): ChildProcessByStdio<Writable, null, null> => {
  const ignoreKeys = uniqueArray([...pinoPrettyIgnoreKeys, ...pinoIgnoreKeys]);

  return exec(
    {
      log,
      args: [
        '--colorize',
        '--translateTime',
        '"SYS:yyyy-mm-dd\'T\'HH:MM:ss.l"',
        '--ignore',
        `"${ignoreKeys.join(',')}"`,
      ],
      cmd: join(root, pinoPrettyCommand),
      cwd,
    },
    { stdin: undefined, stderr: process.stderr, stdout: process.stdout },
  );
};

export { pinoPretty };
