import * as fs from 'fs';
import { join } from 'path';
import { handler } from '../../../src/lib/commands/init';
import { cwd, getAccessFiles, getArgv, getReadFileWithHooksFiles } from '../../shared/configs';

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
  });

  test('it should work with init commit', async () => {
    const result = await handler(getArgv({ package: false, cli: false, noCommit: false }));

    expect(result).toBeUndefined();
  });

  test('it should work without init commit', async () => {
    const result = await handler(getArgv({ package: false, cli: false, noCommit: true }));

    expect(result).toBeUndefined();
  });

  test('it should work with init commit and with github username', async () => {
    const result = await handler(getArgv({ package: false, cli: false, noCommit: false, github: 'username' }));

    expect(result).toBeUndefined();
  });

  test('it should work without init commit and with github username', async () => {
    const result = await handler(getArgv({ package: false, cli: false, noCommit: true, github: 'username' }));

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
