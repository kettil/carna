import { spawn, ChildProcessByStdio, ChildProcessWithoutNullStreams } from 'child_process';
import { env as processEnvironment } from '@kettil/tool-lib';
import { Logger } from '../cli/logger';
import ExecutableError from '../errors/executableError';

type Options = {
  readonly cmd: string;
  readonly args?: readonly string[];
  readonly withInteraction?: boolean;
  readonly withDirectOutput?: boolean;

  readonly cwd?: string;
  readonly env?: NodeJS.ProcessEnv;

  readonly log: Logger;
};

const exec = ({
  cmd,
  args = [],
  withInteraction,
  withDirectOutput,
  cwd = process.cwd(),
  env = processEnvironment(),
  log,
}: Options): Promise<{ stdout: string; stderr: string; output: string }> =>
  new Promise<{ stdout: string; stderr: string; output: string }>((resolve, reject) => {
    const command = `${cmd} ${args.join(' ')}`;

    log.debug(`\nexec: ${command}`);

    let stream: ChildProcessByStdio<null, null, null> | ChildProcessWithoutNullStreams;
    let output = '';
    let stdout = '';
    let stderr = '';

    if (withInteraction) {
      stream = spawn(cmd, args, { cwd, env, shell: true, stdio: [process.stdin, process.stdout, process.stderr] });
    } else {
      stream = spawn(cmd, args, { cwd, env, shell: true });

      if (withDirectOutput) {
        stream.stdout.on('data', (entry) => {
          log.log(String(entry));
        });

        stream.stderr.on('data', (entry) => {
          log.log(String(entry));
        });
      } else {
        stream.stdout.on('data', (data) => {
          const value = String(data);

          output += String(value);
          stdout += String(value);

          log.debug(String(value));
        });

        stream.stderr.on('data', (data) => {
          const value = String(data);

          output += String(value);
          stderr += String(value);

          log.debug(String(value));
        });
      }
    }

    stream.on('close', (code) => {
      if (typeof code === 'number' && code !== 0) {
        reject(new ExecutableError(output, command, code));
      } else {
        resolve({ stdout, stderr, output });
      }
    });
  });

export default exec;
