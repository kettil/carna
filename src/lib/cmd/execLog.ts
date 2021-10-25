import { ExecutableError } from '../errors/executableError';
import { exec, ExecOptions, getExecCommand } from './execA';

const execLog = (props: ExecOptions): Promise<void> =>
  new Promise((resolve, reject) => {
    const stream = exec(props);

    stream.stdout.setEncoding('utf8');
    stream.stderr.setEncoding('utf8');

    stream.stdout.on('data', (data) => {
      props.log.log(String(data));
    });

    stream.stderr.on('data', (data) => {
      props.log.log(String(data));
    });

    stream.on('close', (code) => {
      if (typeof code === 'number' && code !== 0) {
        reject(new ExecutableError('Error during execution', getExecCommand(props), code));
      } else {
        resolve();
      }
    });
  });

export { execLog };
