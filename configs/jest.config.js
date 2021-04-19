const commons = {
  bail: 10,

  testEnvironment: 'node',

  clearMocks: true,
  restoreMocks: true,
};

const createProject = (folder, color, config) => ({
  ...commons,

  displayName: { name: folder, color },
  roots: ['<rootDir>/src', `<rootDir>/tests/${folder}`],

  testMatch: ['**/*.test.{js,ts,tsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/src/'],

  ...config,
});

const config = {
  ...commons,
  projects: [],

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

module.exports = { config, createProject };
