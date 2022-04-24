/* eslint-disable @typescript-eslint/no-unsafe-return -- mock import */
/* eslint-disable @typescript-eslint/no-require-imports -- mock import */
import * as fs from 'fs';
import { getAccessFiles } from '../shared/setup/accessFiles';
import { getReaddirFiles } from '../shared/setup/readdirFiles';
import { getReadFileFiles } from '../shared/setup/readFileFiles';

jest.mock('child_process', () => require('../shared/__mock__/childProcess'));
jest.mock('depcheck', () => require('../shared/__mock__/depcheck'));
jest.mock('fs', () => require('../shared/__mock__/fs'));
jest.mock('glob', () => require('../shared/__mock__/glob'));
jest.mock('istanbul-reports', () => require('../shared/__mock__/istanbulReports'));
jest.mock('ora', () => require('../shared/__mock__/ora'));
jest.mock('semver', () => require('../shared/__mock__/semver'));
jest.mock('npm-package-json-lint', () => require('../shared/__mock__/npmPackageJsonLint'));
jest.mock('../../src/lib/cmd/exit', () => require('../shared/__mock__/exit'));
jest.mock('../../src/lib/cli/process', () => require('../shared/__mock__/process'));

beforeEach(() => {
  (fs as any).setMockAccessFiles(getAccessFiles());
  (fs as any).setMockReadFileFiles(getReadFileFiles());
  (fs as any).setMockReaddirFiles(getReaddirFiles());
});
