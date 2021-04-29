import MessageError from './messageError';

class ExecutableError extends MessageError {
  constructor(message: string, readonly command: string | undefined, readonly code: number) {
    super(message);
  }
}

export default ExecutableError;
