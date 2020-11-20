const commons = {
  clearMocks: true,
  restoreMocks: true,
};

const projects = {
  unit: {
    ...commons,
    displayName: { name: 'unit', color: 'cyan' },
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.test.{js,ts,tsx}'],
  },
  integration: {
    ...commons,
    displayName: { name: 'integration', color: 'magenta' },
    roots: ['<rootDir>/src/', '<rootDir>/tests/'],
    testMatch: ['**/*.test.{js,ts,tsx}'],
    testPathIgnorePatterns: ['/node_modules/', '/src/'],
  },
};

const config = {
  ...commons,
  bail: 10,

  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js}', '!src/**/*.test.{ts,tsx,js}', '!src/**/types.ts'],
  coveragePathIgnorePatterns: ['/__jest__/'],
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
