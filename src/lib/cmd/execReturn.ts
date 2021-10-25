import { ExecutableError } from '../errors/executableError';
import { exec, ExecOptions, getExecCommand } from './exec';

type ExecValueReturn = { stdout: string; stderr: string; output: string };

const execReturn = (props: ExecOptions): Promise<ExecValueReturn> =>
  new Promise<ExecValueReturn>((resolve, reject) => {
    const stream = exec(props);

    stream.stdout.setEncoding('utf8');
    stream.stderr.setEncoding('utf8');

    let output = '';
    let stdout = '';
    let stderr = '';

    stream.stdout.on('data', (data) => {
      const value = String(data);

      output += value;
      stdout += value;

      props.log.debug(value);
    });

    stream.stderr.on('data', (data) => {
      const value = String(data);

      output += value;
      stderr += value;

      props.log.debug(value);
    });

    stream.on('close', (code) => {
      if (typeof code === 'number' && code !== 0) {
        reject(new ExecutableError(output, getExecCommand(props), code));
      } else {
        resolve({ stdout, stderr, output });
      }
    });
  });

export { execReturn };
