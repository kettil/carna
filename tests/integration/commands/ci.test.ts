import * as fs from 'fs';
import { Argv } from 'yargs';
import { handler, builder, command, desc } from '../../../src/lib/commands/ci';
import { PropsGlobal } from '../../../src/lib/types';
import { getArgv } from '../../shared/setup/argv';
import { getReadFileWithHooksFiles } from '../../shared/setup/readFileFiles';

describe('command ci', () => {
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
    const result = await handler(getArgv({}));

    expect(result).toBeUndefined();
  });

  test('it should work with hooks', async () => {
    (fs as any).setMockReadFileFiles(getReadFileWithHooksFiles());

    const result = await handler(getArgv({}));

    expect(result).toBeUndefined();
  }, 15_000);
});
