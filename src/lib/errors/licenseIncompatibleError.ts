class LicenseIncompatibleError extends Error {
  constructor(message: string, readonly list: Array<[string, string, string, string, string]>) {
    super(message);
  }
}

export default LicenseIncompatibleError;
