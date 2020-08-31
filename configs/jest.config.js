module.exports = {
  testMatch: ['**/*.test.{js,jsx,ts,tsx}'],
  roots: ['<rootDir>/src/'],

  clearMocks: true,
  restoreMocks: true,

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
