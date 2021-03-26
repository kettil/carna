class ExecutableError extends Error {
  constructor(
    message: string,
    readonly command: string | undefined,
    readonly code: number,
    readonly stdout: string,
    readonly stderr: string,
  ) {
    super(message);
  }
}

export default ExecutableError;
