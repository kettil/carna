import * as fs from 'fs';
import { Argv } from 'yargs';
import { handler, builder, command, desc } from '../../../src/lib/commands/git';
import { PropsGlobal } from '../../../src/lib/types';
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

  describe('with unknwon hook', () => {
    test('it should throw an error', async () => {
      const promise = handler(getArgv({ hook: 'foo' as any }));

      await expect(promise).rejects.toThrow('The git hook "foo" is unknown');
    });

    test('it should throw an error with hooks', async () => {
      (fs as any).setMockReadFileFiles(getReadFileWithHooksFiles());

      const promise = handler(getArgv({ hook: 'foo' as any, edit: 'path/to/commit.message' }));

      await expect(promise).rejects.toThrow('The git hook "foo" is unknown');
    });
  });
});
