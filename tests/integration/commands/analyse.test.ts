import * as fs from 'fs';
import type { Argv } from 'yargs';
import { handler, builder, command, desc } from '../../../src/lib/commands/analyse';
import type { PropsGlobal } from '../../../src/lib/types';
import { getAccessFiles } from '../../shared/setup/accessFiles';
import { getArgv } from '../../shared/setup/argv';
import { getReadFileWithHooksFiles } from '../../shared/setup/readFileFiles';

describe('command analyse', () => {
  test('it should be complete the yargs command structure', () => {
    expect(typeof command).toBe('string');
    expect(typeof desc).toBe('string');
    expect(typeof builder).toBe('function');
    expect(typeof handler).toBe('function');
  });

  test('it should be create the expected builder', () => {
    expect.assertions(2);

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
  });

  test.each<['eslint' | 'prettier' | 'typescript']>([['eslint'], ['prettier'], ['typescript']])(
    'it should work with only %p',
    async (only) => {
      (fs as any).setMockAccessFiles(getAccessFiles());

      const result = await handler(getArgv({ only }));

      expect(result).toBeUndefined();
    },
  );
});
