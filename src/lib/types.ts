import { Logger } from './cli/logger';

export type NpmInstallMode = 'dev' | 'optional' | 'prod';

export type PropsGlobal = {
  readonly cwd: string;
  readonly tpl: string;
  readonly cfg: string;
  readonly log: Logger;
  readonly vvv: boolean;
  readonly ci: boolean;
};

export type Action<
  Props extends Record<string, unknown> | undefined = undefined,
  ActionReturn = void
> = Props extends undefined
  ? (argv: PropsGlobal) => Promise<ActionReturn>
  : (argv: PropsGlobal, props: Props) => Promise<ActionReturn>;

export type Task<
  Props extends Record<string, unknown> | undefined = undefined,
  ActionReturn = void
> = Props extends undefined
  ? (argv: PropsGlobal) => Promise<ActionReturn>
  : (argv: PropsGlobal, props: Props) => Promise<ActionReturn>;

export type LicenseCompatibilities = Record<string, string[]>;
export type LicenseHeuristics = Record<string, RegExp>;
export type LicensePackages = Record<string, Record<string, string>>;
export type LicensePackageInfo = {
  path: string;
  name: string;
  license: string | 'UNKNOWN';
  version: string | 'UNKNOWN';
};
