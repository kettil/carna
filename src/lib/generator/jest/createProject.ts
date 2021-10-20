import { join } from 'path';
import { isObject, isString } from '@kettil/tool-lib';
import { defaultConfig } from './defaultConfig';
import { getSetupFilesAfterEnvironment } from './getSetupFilesAfterEnvironment';

const createProject =
  (settings: unknown) =>
    (root: string, workspaces: Record<string, string>): Record<string, unknown> => {
      if (!isObject(settings)) {
        throw new TypeError('createProject requires an object as the first argument');
      }

      const { testFolder, workspaceFolder, color, customeConfig = {} } = settings;
      const hasWorkspace = isString(workspaceFolder);

      if (hasWorkspace && !Object.keys(workspaces).includes(workspaceFolder)) {
        throw new TypeError(`Workspace "${workspaceFolder}" is unknown - createProject({ workspaceFolder: "<name>" })`);
      }

      if (typeof testFolder !== 'string') {
        throw new TypeError('"testFolder" is not a string - createProject({ testFolder: "<name>" })');
      }

      if (typeof color !== 'string') {
        throw new TypeError('"color" is not a color string - createProject({ color: "<color>" })');
      }

      if (!isObject(customeConfig)) {
        throw new TypeError('"customeConfig" is not an object - createProject({ customeConfig: { ... } })');
      }

      const pathWorkspace = hasWorkspace ? workspaces[workspaceFolder] : '';

      const configPathSource = hasWorkspace ? `${pathWorkspace}/src` : '<rootDir>/src';
      const configPathTests = hasWorkspace ? `${pathWorkspace}/tests/${testFolder}` : `<rootDir>/tests/${testFolder}`;

      const name = (hasWorkspace ? `${workspaceFolder}:` : '') + testFolder;

      const pathTest = join(root, configPathTests.replace('<rootDir>', '.'));

      return {
        ...defaultConfig,

        displayName: { name, color },
        roots: [configPathSource, configPathTests],
        testMatch: ['**/*.test.{js,ts,tsx}'],
        testPathIgnorePatterns: ['/node_modules/', '/src/'],
        setupFilesAfterEnv: getSetupFilesAfterEnvironment(pathTest, ['setupTests']),

        ...customeConfig,
      };
    };

export { createProject };
