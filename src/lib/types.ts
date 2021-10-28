import { Logger } from './cli/logger';

type PropsGlobal = {
  readonly root: string;
  readonly cwd: string;
  readonly cfg: string;
  readonly log: Logger;
  readonly vvv: boolean;
  readonly ci: boolean;
};

type PropsTypes = Record<string, unknown> | unknown[] | undefined;

type Action<Props extends PropsTypes = undefined, ActionReturn = void> = Props extends undefined
  ? (argv: PropsGlobal) => Promise<ActionReturn>
  : Props extends unknown[]
    ? (argv: PropsGlobal, ...props: Props) => Promise<ActionReturn>
    : (argv: PropsGlobal, props: Props) => Promise<ActionReturn>;

type Task<Props extends PropsTypes = undefined, ActionReturn = void> = Props extends undefined
  ? (argv: PropsGlobal) => Promise<ActionReturn>
  : Props extends unknown[]
    ? (argv: PropsGlobal, ...props: Props) => Promise<ActionReturn>
    : (argv: PropsGlobal, props: Props) => Promise<ActionReturn>;

type LicenseCompatibilities = Record<string, string[]>;
type LicenseHeuristics = Record<string, RegExp>;
type LicenseAliases = Record<string, Record<string, string>>;
type LicensePackageInfo = {
  path: string;
  name: string;
  license: string | 'UNKNOWN';
  version: string | 'UNKNOWN';
};
type LicenseConfig = {
  compatibilities: LicenseCompatibilities;
  ignorePackages: string[];
  heuristics: LicenseHeuristics;
  aliases: LicenseAliases;
};

export type {
  Action,
  LicenseAliases,
  LicenseCompatibilities,
  LicenseConfig,
  LicenseHeuristics,
  LicensePackageInfo,
  PropsGlobal,
  Task,
};
