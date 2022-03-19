import type { ChildProcessByStdio } from 'child_process';
import type { Readable, Writable } from 'stream';
import { getStdin } from '../cli/process';
import { ExecutableError } from '../errors/executableError';
import type { ExecOptions } from './exec';
import { exec, getExecCommand } from './exec';

type PipeType = ChildProcessByStdio<Writable, Readable | null, Readable | null>;

const execStdio = async (
  props: ExecOptions,
  { registerStdin = false, pipe }: { registerStdin?: boolean; pipe?: PipeType } = {},
): Promise<void> =>
  new Promise((resolve, reject) => {
    const { stderr } = process;
    const stdout = pipe ? undefined : process.stdout;
    const stdin = registerStdin ? getStdin() : undefined;

    if (stdin) {
      stdin.setEncoding('utf8');
      stdin.setRawMode(true);
      stdin.resume();
    }

    const stream = exec(props, { stdin, stdout, stderr });

    if (stream.stdout && pipe) {
      stream.stdout.pipe(pipe.stdin);
    }

    stream.once('close', (code) => {
      if (stdin) {
        stdin.setRawMode(false);
        stdin.pause();
      }

      if (typeof code === 'number' && code !== 0) {
        reject(new ExecutableError('Error during execution', getExecCommand(props), code));
      } else {
        resolve();
      }
    });
  });

export { execStdio };
