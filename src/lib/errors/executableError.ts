class ExecutableError extends Error {
  constructor(message: string, readonly command: string | undefined, readonly code: number, readonly entries: string) {
    super(message);
  }
}

export default ExecutableError;
