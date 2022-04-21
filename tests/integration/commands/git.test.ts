import * as fs from 'fs';
import type { Argv } from 'yargs';
import { handler, builder, command, desc } from '../../../src/lib/commands/git';
import type { PropsGlobal } from '../../../src/lib/types';
import { getArgv } from '../../shared/setup/argv';
import { getReadFileWithHooksFiles } from '../../shared/setup/readFileFiles';


describe('command git', () => {
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
    const result = await handler(getArgv({ edit: 'path/to/commit.message' }));

    expect(result).toBeUndefined();
  }, 15_000);

  test('it should work with hooks', async () => {
    (fs as any).setMockReadFileFiles(getReadFileWithHooksFiles());

    const result = await handler(getArgv({ edit: 'path/to/commit.message' }));

    expect(result).toBeUndefined();
  }, 15_000);

  test('it should throw an error why "edit" is empty', async () => {
    const promise = handler(getArgv({ edit: '' }));

    await expect(promise).rejects.toThrow('Argument "edit" is required');
  });
});
