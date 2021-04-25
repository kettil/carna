const { accessSync, constants } = require('fs');
const { join } = require('path');

const globalScriptReadable = (path, type, extendsion) => {
  try {
    const file = join(path, `${type}.${extendsion}`);

    accessSync(file, constants.R_OK);

    return file;
  } catch (error) {
    return undefined;
  }
};

const globalScript = (folder, type) => {
  const path = join(process.cwd(), 'tests', folder);

  return globalScriptReadable(path, type, 'ts') ?? globalScriptReadable(path, type, 'js');
};

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

  globalSetup: globalScript(folder, 'setup'),
  globalTeardown: globalScript(folder, 'teardown'),

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
  coverageReporters: ['text-summary', 'html'],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95,
    },
  },
};

module.exports = { config, createProject };
