import { SpinnerWarnError } from './spinnerWarnError';

class DependencyWarn extends SpinnerWarnError {
  constructor(message: string, readonly list: string[]) {
    super(message);
  }
}

export { DependencyWarn };
