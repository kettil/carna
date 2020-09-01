const project = {
  testMatch: ['**/*.test.{js,jsx,ts,tsx}'],
  clearMocks: true,
  restoreMocks: true,
};

const projects = {
  unit: { ...project, displayName: { name: 'unit', color: 'cyan' }, roots: ['<rootDir>/src/'] },
  integration: { ...project, displayName: { name: 'integration', color: 'cyan' }, roots: ['<rootDir>/tests/'] },
};

const config = {
  bail: 10,

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  coveragePathIgnorePatterns: ['/__jest__/', 'types.ts'],
  coverageReporters: ['text-summary', 'html'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
};

module.exports = { config, projects };
