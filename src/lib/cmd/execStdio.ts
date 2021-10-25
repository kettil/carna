import { getStdin } from '../cli/process';
import { ExecutableError } from '../errors/executableError';
import { exec, ExecOptions, getExecCommand } from './execA';

const execStdio = (props: ExecOptions, { registerStdin = false }: { registerStdin?: boolean } = {}): Promise<void> =>
  new Promise((resolve, reject) => {
    const { stdout, stderr } = process;
    const stdin = registerStdin ? getStdin() : undefined;

    if (stdin) {
      stdin.setEncoding('utf8');
      stdin.setRawMode(true);
      stdin.resume();
    }

    const stream = exec(props, { stdin, stdout, stderr });

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
