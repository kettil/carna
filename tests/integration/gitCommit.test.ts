import * as fs from 'fs';
import { handler } from '../../src/lib/commands/git';
import {
  getAccessFiles,
  getArgv,
  getReaddirFiles,
  getReadFileFiles,
  getReadFileWithHooksFiles,
} from '../shared/configs';

jest.mock('child_process', () => require('../shared/__mock__/childProcess'));
jest.mock('fs', () => require('../shared/__mock__/fs'));
jest.mock('ora', () => require('../shared/__mock__/ora'));
jest.mock('exit', () => require('../shared/__mock__/exit'));
jest.mock('semver', () => require('../shared/__mock__/semver'));
jest.mock('depcheck', () => require('../shared/__mock__/depcheck'));
jest.mock('istanbul-reports', () => require('../shared/__mock__/istanbulReports'));

describe('command git with git "commit" hook', () => {
  beforeEach(() => {
    (fs as any).setMockAccessFiles(getAccessFiles());
    (fs as any).setMockReadFileFiles(getReadFileFiles());
    (fs as any).setMockReaddirFiles(getReaddirFiles());
  });

  test('it should work', async () => {
    const result = await handler(getArgv({ hook: 'commit' }));

    expect(result).toBeUndefined();
  });

  test('it should work with hooks', async () => {
    (fs as any).setMockReadFileFiles(getReadFileWithHooksFiles());

    const result = await handler(getArgv({ hook: 'commit' }));

    expect(result).toBeUndefined();
  }, 15_000);
});
