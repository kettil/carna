const npmPackageJsonLintLint = jest.fn().mockReturnValue({ results: [{ issues: [] }] });

const NpmPackageJsonLint = jest.fn().mockReturnValue({ lint: npmPackageJsonLintLint });

export { NpmPackageJsonLint };
