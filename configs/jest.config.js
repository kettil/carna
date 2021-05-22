const { accessSync, constants } = require('fs');
const { join } = require('path');

const getSetupPathOrUndefined = (path, type, extendsion) => {
  try {
    const file = join(path, `${type}.${extendsion}`);

    accessSync(file, constants.R_OK);

    return [file];
  } catch (error) {
    return undefined;
  }
};

const getSetupFilesAfterEnvironment = (folder, type) => {
  const path = join(process.cwd(), 'tests', folder);

  return getSetupPathOrUndefined(path, type, 'ts') ?? getSetupPathOrUndefined(path, type, 'js');
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

  setupFilesAfterEnv: getSetupFilesAfterEnvironment(folder, 'setupTests'),

  ...config,
});

const config = {
  ...commons,
  projects: [],

  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx,js}',
    '!<rootDir>/src/**/types.ts',
    '!<rootDir>/src/index.ts',

    '<rootDir>/packages/*/src/**/*.{ts,tsx,js}',
    '!<rootDir>/packages/*/src/**/types.ts',
    '!<rootDir>/packages/*/src/index.ts',
  ],
};

module.exports = { config, createProject };
