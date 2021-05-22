import * as fs from 'fs';
import { handler } from '../../../src/lib/commands/git';
import { getArgv, getReadFileWithHooksFiles } from '../../shared/configs';

describe('command git with git "msg" hook', () => {
  test('it should work', async () => {
    const result = await handler(getArgv({ hook: 'msg', edit: 'path/to/commit.message' }));

    expect(result).toBeUndefined();
  });

  test('it should work with hooks', async () => {
    (fs as any).setMockReadFileFiles(getReadFileWithHooksFiles());

    const result = await handler(getArgv({ hook: 'msg', edit: 'path/to/commit.message' }));

    expect(result).toBeUndefined();
  });

  test('it should throw an error why "edit" is empty', async () => {
    const promise = handler(getArgv({ hook: 'msg', edit: '' }));

    await expect(promise).rejects.toThrow('Argument "edit" is required at hook "msg"');
  });
});
