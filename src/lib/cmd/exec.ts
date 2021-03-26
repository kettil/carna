import { spawn } from 'child_process';
import { env as processEnvironment } from '@kettil/tool-lib';
import { Logger } from '../cli/logger';
import ExecutableError from '../errors/executableError';

type Options = {
  readonly cmd: string;
  readonly args?: readonly string[];
  readonly output?: (msg: string) => void;

  readonly cwd?: string;
  readonly env?: NodeJS.ProcessEnv;

  readonly log: Logger;
};

const exec = ({
  cmd,
  args = [],
  output,
  cwd = process.cwd(),
  env = processEnvironment(),
  log,
}: Options): Promise<{
  stdout: string;
  stderr: string;
}> =>
  new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const command = `${cmd} ${args.join(' ')}`;

    log.debug(`\nexec: ${command}`);

    const stream = spawn(cmd, args, { cwd, env, shell: true });
    let stdout = '';
    let stderr = '';

    stream.stdout.on('data', (data) => {
      stdout += String(data);
      log.debug(String(data));

      if (output) {
        output(String(data));
      }
    });

    stream.stderr.on('data', (data) => {
      stderr += String(data);
      log.debug(String(data));

      if (output) {
        output(String(data));
      }
    });

    stream.on('close', (code) => {
      if (typeof code === 'number' && code !== 0) {
        reject(new ExecutableError(stderr, command, code, stdout, stderr));
      } else {
        resolve({ stdout, stderr });
      }
    });
  });

export default exec;
