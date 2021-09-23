import * as fs from 'fs';
import { join } from 'path';
import { Argv } from 'yargs';
import { handler, builder, command, desc } from '../../../src/lib/commands/test';
import { PropsGlobal } from '../../../src/lib/types';
import { cwd, getArgv } from '../../shared/setup/argv';
import coverageE2E1 from '../../shared/setup/data/coverage-e2e-1.json';
import coverageUnit1 from '../../shared/setup/data/coverage-unit-1.json';
import coverageUnit2 from '../../shared/setup/data/coverage-unit-2.json';
import { getReadFileWithHooksFiles } from '../../shared/setup/readFileFiles';

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
        ...coverageUnit1,
        path: join(cwd, 'src', 'index.ts'),
      },
      [join(cwd, 'src', 'lib', 'app.ts')]: {
        ...coverageUnit2,
        path: join(cwd, 'src', 'lib', 'app.ts'),
      },
    };

    // eslint-disable-next-line unicorn/prevent-abbreviations -- e2e is correkt name
    const coverageForE2e = {
      [join(cwd, 'src', 'index.ts')]: {
        ...coverageE2E1,
        path: join(cwd, 'src', 'index.ts'),
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
