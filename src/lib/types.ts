import { Logger } from './cli/logger';

export type NpmInstallMode = 'prod' | 'dev' | 'optional';

export type PropsGlobal = {
  readonly cwd: string;
  readonly tpl: string;
  readonly cfg: string;
  readonly log: Logger;
  readonly vvv: boolean;
};

export type Action<
  Props extends Record<string, unknown> | undefined = undefined,
  ActionReturn = void
> = Props extends undefined
  ? (argv: PropsGlobal) => Promise<ActionReturn>
  : (argv: PropsGlobal, props: Props) => Promise<ActionReturn>;
