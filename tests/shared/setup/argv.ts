import { join } from 'path';
import { isArray } from '@kettil/tool-lib';
import { Arguments } from 'yargs';
import { PropsGlobal } from '../../../src/lib/types';

const cwd = '/path/to/project';

const cfg = join(cwd, 'node_modules', 'carna', 'configs');
const tpl = join(cwd, 'node_modules', 'carna', 'templates');

const getArgv = <T extends Record<string, unknown>>(props: T): Arguments<PropsGlobal & T> => {
  const log = jest.fn((msg: unknown) => {
    expect(typeof msg === 'string' || isArray(msg)).toBeTruthy();
  });

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _: [],
    $0: '',
    cwd,
    cfg,
    tpl,
    ci: false,
    vvv: false,
    log: { debug: log, error: log, info: log, log },
    ...props,
  };
};

export { cwd, cfg, tpl, getArgv };
