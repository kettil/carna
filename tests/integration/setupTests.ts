import * as fs from 'fs';
import { getAccessFiles, getReaddirFiles, getReadFileFiles } from '../shared/configs';

jest.mock('child_process', () => require('../shared/__mock__/childProcess'));
jest.mock('fs', () => require('../shared/__mock__/fs'));
jest.mock('ora', () => require('../shared/__mock__/ora'));
jest.mock('exit', () => require('../shared/__mock__/exit'));
jest.mock('semver', () => require('../shared/__mock__/semver'));
jest.mock('depcheck', () => require('../shared/__mock__/depcheck'));
jest.mock('istanbul-reports', () => require('../shared/__mock__/istanbulReports'));

beforeEach(() => {
  (fs as any).setMockAccessFiles(getAccessFiles());
  (fs as any).setMockReadFileFiles(getReadFileFiles());
  (fs as any).setMockReaddirFiles(getReaddirFiles());
});
