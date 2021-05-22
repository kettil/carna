import * as fs from 'fs';
import { join } from 'path';
import { Argv } from 'yargs';
import { handler, builder, command, desc } from '../../../src/lib/commands/test';
import { PropsGlobal } from '../../../src/lib/types';
import { cwd, getArgv, getReadFileWithHooksFiles } from '../../shared/configs';

describe('command test', () => {
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
    const coverageForUnit = {
      [join(cwd, 'src', 'index.ts')]: {
        path: join(cwd, 'src', 'index.ts'),
        statementMap: { 0: { start: { line: 4, column: 41 }, end: { line: 15, column: 1 } } },
        fnMap: {},
        branchMap: {},
        s: { 0: 1 },
        f: {},
        b: {},
      },

      [join(cwd, 'src', 'lib', 'app.ts')]: {
        path: join(cwd, 'src', 'lib', 'app.ts'),
        statementMap: {
          0: { start: { line: 10, column: 12 }, end: { line: 10, column: 52 } },
        },
        fnMap: {
          0: {
            name: '(anonymous_0)',
            decl: { start: { line: 19, column: 12 }, end: { line: 19, column: 13 } },
            loc: { start: { line: 19, column: 53 }, end: { line: 42, column: 1 } },
            line: 19,
          },
        },
        branchMap: {},
        s: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 },
        f: { 0: 1, 1: 1 },
        b: {},
      },
    };

    // eslint-disable-next-line unicorn/prevent-abbreviations
    const coverageForE2e = {
      [join(cwd, 'src', 'lib', 'app.ts')]: {
        path: join(cwd, 'src', 'lib', 'app.ts'),
        statementMap: {},
        fnMap: {},
        branchMap: {},
        s: {},
        f: {},
        b: {},
      },
    };

    (fs as any).setMockReadFileFiles(
      getReadFileWithHooksFiles({
        [join(cwd, 'coverage', '_e2e', 'coverage-final.json')]: JSON.stringify(coverageForE2e),
        [join(cwd, 'coverage', '_unit', 'coverage-final.json')]: JSON.stringify(coverageForUnit),
      }),
    );

    const result = await handler(getArgv({}));

    expect(result).toBeUndefined();
  });

  test('it should work with ci mode', async () => {
    const result = await handler(getArgv({ ci: true }));

    expect(result).toBeUndefined();
  });

  test('it should work with watch mode', async () => {
    const result = await handler(getArgv({ watch: true }));

    expect(result).toBeUndefined();
  });

  test('it should work with update-snapshot mode', async () => {
    const result = await handler(getArgv({ updateSnapshot: true }));

    expect(result).toBeUndefined();
  });

  test('it should work with run-in-band mode', async () => {
    const result = await handler(getArgv({ runInBand: true }));

    expect(result).toBeUndefined();
  });

  test('it should work with selected project', async () => {
    const result = await handler(getArgv({ projects: ['e2e'] }));

    expect(result).toBeUndefined();
  });
});
