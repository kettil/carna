class SpinnerWarnError extends Error {
  constructor(message: string, readonly spinnerText?: string) {
    super(message);
  }
}

export { SpinnerWarnError };
