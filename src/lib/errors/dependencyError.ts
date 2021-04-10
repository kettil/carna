import SpinnerWarnError from './spinnerWarnError';

class DependencyError extends SpinnerWarnError {
  constructor(message: string, readonly list: string[]) {
    super(message);
  }
}

export default DependencyError;
