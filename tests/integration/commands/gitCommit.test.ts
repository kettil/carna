import * as fs from 'fs';
import { handler } from '../../../src/lib/commands/git';
import { getArgv, getReadFileWithHooksFiles } from '../../shared/configs';

describe('command git with git "commit" hook', () => {
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
