import { spinnerAction } from '../cli/spinner';
import { SpinnerWarnError } from '../errors/spinnerWarnError';

const taskIsDiasbled = async (message: string): Promise<void> => {
  try {
    const packageLintWarning = new SpinnerWarnError(message);

    await spinnerAction(Promise.reject(packageLintWarning), message);
  } catch (error: unknown) {
    // Only one warning should be displayed.
    if (!(error instanceof SpinnerWarnError)) {
      throw error;
    }
  }
};

export { taskIsDiasbled };
