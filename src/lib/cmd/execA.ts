import { spawn, ChildProcessWithoutNullStreams, ChildProcessByStdio } from 'child_process';
import { Readable, Writable } from 'stream';
import { env as processEnvironment } from '@kettil/tool-lib';
import { Logger } from '../cli/logger';
import { SpawnKillHandler } from '../utils/createSpawnKillHandler';

type ExecOptions = {
  readonly cmd: string;
  readonly args: readonly string[];
  readonly spawnKillHandler?: SpawnKillHandler;

  readonly cwd: string;
  readonly envPrefix?: NodeJS.ProcessEnv;
  readonly envSuffix?: NodeJS.ProcessEnv;

  readonly log: Logger;
};

type Stdio<Stdin = Writable | undefined, Stdout = Readable | undefined, Stderr = Readable | undefined> = {
  stdin?: Stdin;
  stdout?: Stdout;
  stderr?: Stderr;
};

type Exec = {
  (options: ExecOptions): ChildProcessWithoutNullStreams;
  (options: ExecOptions, stdio: Stdio<Writable, Readable, Readable>): ChildProcessByStdio<null, null, null>;
  (options: ExecOptions, stdio: Stdio<Writable, Readable, undefined>): ChildProcessByStdio<null, null, Readable>;
  (options: ExecOptions, stdio: Stdio<Writable, undefined, Readable>): ChildProcessByStdio<null, Readable, null>;
  (options: ExecOptions, stdio: Stdio<undefined, Readable, Readable>): ChildProcessByStdio<Writable, null, null>;
  (options: ExecOptions, stdio: Stdio<Writable, undefined, undefined>): ChildProcessByStdio<null, Readable, Readable>;
  (options: ExecOptions, stdio: Stdio<undefined, Readable, undefined>): ChildProcessByStdio<Writable, null, Readable>;
  (options: ExecOptions, stdio: Stdio<undefined, undefined, Readable>): ChildProcessByStdio<Writable, Readable, null>;
  (options: ExecOptions, stdio: Stdio<undefined, undefined, undefined>): ChildProcessByStdio<
    Writable,
    Readable,
    Readable
  >;
};

const getExecCommand = ({ cmd, args }: Pick<ExecOptions, 'args' | 'cmd'>): string => `${cmd} ${args.join(' ')}`;

const exec: Exec = (
  { cwd, cmd, args, envPrefix = {}, envSuffix = {}, spawnKillHandler, log }: ExecOptions,
  { stdin, stdout, stderr }: Stdio = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- overwrite funcs
): any => {
  const env = { ...envPrefix, ...processEnvironment(), ...envSuffix };

  log.info(`\ncwd:  ${cwd}`);
  log.info(`exec: ${getExecCommand({ cmd, args })}`);

  const stream = spawn(cmd, args, {
    cwd,
    env,
    shell: true,
    stdio: [stdin ?? 'pipe', stdout ?? 'pipe', stderr ?? 'pipe'],
  });

  if (spawnKillHandler) {
    spawnKillHandler.addCallback((signal) => stream.kill(signal));
  }

  return stream;
};

export type { ExecOptions };
export { exec, getExecCommand };
