/* eslint-disable @typescript-eslint/naming-convention */
import * as fs from 'fs';
import { Argv } from 'yargs';
import { handler, builder, command, desc } from '../../src/lib/commands/license';
import { PropsGlobal } from '../../src/lib/types';
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

describe('command license', () => {
  beforeEach(() => {
    (fs as any).setMockAccessFiles(getAccessFiles());
    (fs as any).setMockReadFileFiles(getReadFileFiles());
    (fs as any).setMockReaddirFiles(getReaddirFiles());
  });

  test('it should be complete the yargs command structure', () => {
    expect(typeof command).toBe('string');
    expect(typeof desc).toBe('string');
    expect(typeof builder).toBe('function');
    expect(typeof handler).toBe('function');
  });

  test('it should be create the expected builder', () => {
    const yargs = {
      options: jest.fn((...args: unknown[]) => {
        expect(args).toMatchSnapshot('options');

        return yargs;
      }),
      usage: jest.fn((...args: unknown[]) => {
        expect(args).toMatchSnapshot('usage');

        return yargs;
      }),

      help: jest.fn(() => yargs),
      version: jest.fn(() => yargs),
      showHelpOnFail: jest.fn(() => yargs),
    } as unknown as Argv<PropsGlobal>;

    builder(yargs);
  });

  test('it should work', async () => {
    await handler(getArgv({ hook: 'msg', edit: 'path/to/commit.message' }));

    expect(true).toBeTruthy();
  });

  test('it should work with hooks', async () => {
    (fs as any).setMockReadFileFiles(getReadFileWithHooksFiles());

    await handler(getArgv({ hook: 'msg', edit: 'path/to/commit.message' }));

    expect(true).toBeTruthy();
  });
});
