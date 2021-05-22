import * as fs from 'fs';
import { join } from 'path';
import { handler } from '../../src/lib/commands/init';
import {
  cwd,
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

describe('command init (app)', () => {
  beforeEach(() => {
    (fs as any).setMockAccessFiles(
      getAccessFiles({
        [join(cwd, '.vscode')]: false,
        [join(cwd, 'src')]: false,
        [join(cwd, 'src/bin')]: false,
        [join(cwd, 'src/lib')]: false,
        [join(cwd, 'src/lib/types.ts')]: false,
        [join(cwd, 'tests')]: false,
        [join(cwd, 'tests', 'shared')]: false,
        [join(cwd, 'tests', 'shared', '.keep')]: false,
        [join(cwd, 'tests', 'type')]: false,
        [join(cwd, 'tests', 'type', '.keep')]: false,
        [join(cwd, 'tests', 'unit')]: false,
        [join(cwd, 'tests', 'integration')]: false,
        [join(cwd, 'tests', 'e2e')]: false,
      }),
    );

    (fs as any).setMockReadFileFiles(getReadFileFiles());
    (fs as any).setMockReaddirFiles(getReaddirFiles());
  });

  test('it should work with init commit', async () => {
    const result = await handler(getArgv({ package: false, cli: false, noCommit: false }));

    expect(result).toBeUndefined();
  });

  test('it should work without init commit', async () => {
    const result = await handler(getArgv({ package: false, cli: false, noCommit: true }));

    expect(result).toBeUndefined();
  });

  test('it should work with hooks and with init commit', async () => {
    (fs as any).setMockReadFileFiles(getReadFileWithHooksFiles());

    const result = await handler(getArgv({ package: false, cli: false, noCommit: false }));

    expect(result).toBeUndefined();
  });

  test('it should work with hooks and without init commit', async () => {
    (fs as any).setMockReadFileFiles(getReadFileWithHooksFiles());

    const result = await handler(getArgv({ package: false, cli: false, noCommit: true }));

    expect(result).toBeUndefined();
  });
});
