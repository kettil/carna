import { Logger } from './cli/logger';

type NpmInstallMode = 'dev' | 'optional' | 'prod';

type PropsGlobal = {
  readonly cwd: string;
  readonly tpl: string;
  readonly cfg: string;
  readonly log: Logger;
  readonly vvv: boolean;
  readonly ci: boolean;
};

type Action<Props extends Record<string, unknown> | unknown[] | undefined = undefined, ActionReturn = void> =
  Props extends undefined
    ? (argv: PropsGlobal) => Promise<ActionReturn>
    : Props extends unknown[]
      ? (argv: PropsGlobal, ...props: Props) => Promise<ActionReturn>
      : (argv: PropsGlobal, props: Props) => Promise<ActionReturn>;

type Task<Props extends Record<string, unknown> | unknown[] | undefined = undefined, ActionReturn = void> =
  Props extends undefined
    ? (argv: PropsGlobal) => Promise<ActionReturn>
    : Props extends unknown[]
      ? (argv: PropsGlobal, ...props: Props) => Promise<ActionReturn>
      : (argv: PropsGlobal, props: Props) => Promise<ActionReturn>;

type LicenseCompatibilities = Record<string, string[]>;
type LicenseHeuristics = Record<string, RegExp>;
type LicensePackages = Record<string, Record<string, string>>;
type LicensePackageInfo = {
  path: string;
  name: string;
  license: string | 'UNKNOWN';
  version: string | 'UNKNOWN';
};

export type {
  NpmInstallMode,
  PropsGlobal,
  Action,
  Task,
  LicenseCompatibilities,
  LicenseHeuristics,
  LicensePackages,
  LicensePackageInfo,
};
