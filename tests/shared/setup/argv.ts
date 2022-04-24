import { join } from 'path';
import { isArray, isString } from '@kettil/tools';
import type { Arguments } from 'yargs';
import type { PropsGlobal } from '../../../src/lib/types';

const cwd = '/path/to/project';
const root = '/path/to/project';
const cfg = join(cwd, 'node_modules', 'carna', 'configs');

const getArgv = <T extends Record<string, unknown>>(props: T): Arguments<PropsGlobal & T> => {
  const log = jest.fn((msg: unknown) => {
    expect(isString(msg) || isArray(msg)).toBeTruthy();
  });

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- external dependency
    _: [],
    $0: '',
    root,
    cwd,
    cfg,
    ci: false,
    vvv: false,
    log: { debug: log, error: log, info: log, log },
    ...props,
  };
};

export { cwd, cfg, root, getArgv };
