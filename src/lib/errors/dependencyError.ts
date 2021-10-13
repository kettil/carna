class DependencyError extends Error {
  constructor(message: string, readonly list: string[]) {
    super(message);
  }
}

export { DependencyError };
