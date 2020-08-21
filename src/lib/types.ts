import { Logger } from './cli/logger';

export type NpmInstallMode = 'prod' | 'dev' | 'optional';

export type PropsGlobal = {
  readonly cwd: string;
  readonly tpl: string;
  readonly cfg: string;
  readonly log: Logger;
};

export type Action<Props extends Record<string, unknown> = Record<string, unknown>, ActionReturn = void> = (
  argv: PropsGlobal,
  props: Props,
) => Promise<ActionReturn>;
