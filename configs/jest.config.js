const commons = {
  bail: 10,

  testEnvironment: 'node',

  clearMocks: true,
  restoreMocks: true,
};

const projectCommon = {
  ...commons,
  testMatch: ['**/*.test.{js,ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/src/'],
};

const projects = {
  unit: {
    ...projectCommon,
    displayName: { name: 'unit', color: 'cyan' },
    roots: ['<rootDir>/src', '<rootDir>/tests/unit'],
  },
  integration: {
    ...projectCommon,
    displayName: { name: 'integration', color: 'magenta' },
    roots: ['<rootDir>/src/', '<rootDir>/tests/integration'],
  },
  e2e: {
    ...projectCommon,
    displayName: { name: 'e2e', color: 'yellow' },
    roots: ['<rootDir>/src/', '<rootDir>/tests/e2e'],
  },
};

const config = {
  ...commons,
  projects,

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx,js}',
    '!<rootDir>/src/**/types.ts',
    '!<rootDir>/src/index.ts',

    '<rootDir>/packages/*/src/**/*.{ts,tsx,js}',
    '!<rootDir>/packages/*/src/**/types.ts',
    '!<rootDir>/packages/*/src/index.ts',
  ],
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

module.exports = { config, projects, projectCommon };
