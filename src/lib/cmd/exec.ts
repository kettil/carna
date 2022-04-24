import type { ChildProcessWithoutNullStreams, ChildProcessByStdio } from 'child_process';
import { spawn } from 'child_process';
import type { Readable, Writable } from 'stream';
import { env as processEnvironment } from '@kettil/tools';
import type { Logger } from '../cli/logger';
import type { SpawnKillHandler } from '../utils/createSpawnKillHandler';

type ExecOptions = {
  readonly cmd: string;
  readonly args: readonly string[];
  readonly spawnKillHandler?: SpawnKillHandler;

  readonly cwd: string;
  readonly envPrefix?: NodeJS.ProcessEnv;
  readonly envSuffix?: NodeJS.ProcessEnv;

  readonly log: Logger;
};

// internal wrapper
type U = undefined;
type N = null;
type R = Readable;
type W = Writable;

type Exec = {
  (options: ExecOptions): ChildProcessWithoutNullStreams;
  (options: ExecOptions, stdio: { stdin: W; stdout: R; stderr: R }): ChildProcessByStdio<N, N, N>;
  (options: ExecOptions, stdio: { stdin: W; stdout: R; stderr: U }): ChildProcessByStdio<N, N, R>;
  (options: ExecOptions, stdio: { stdin: W; stdout: U; stderr: R }): ChildProcessByStdio<N, R, N>;
  (options: ExecOptions, stdio: { stdin: U; stdout: R; stderr: R }): ChildProcessByStdio<W, N, N>;
  (options: ExecOptions, stdio: { stdin: W; stdout: U; stderr: U }): ChildProcessByStdio<N, R, R>;
  (options: ExecOptions, stdio: { stdin: U; stdout: R; stderr: U }): ChildProcessByStdio<W, N, R>;
  (options: ExecOptions, stdio: { stdin: U; stdout: U; stderr: R }): ChildProcessByStdio<W, R, N>;
  (options: ExecOptions, stdio: { stdin: U; stdout: U; stderr: U }): ChildProcessByStdio<W, R, R>;
  (options: ExecOptions, stdio: { stdin: U | W; stdout: R | U; stderr: R }): ChildProcessByStdio<N | W, N | R, N>;
};

const getExecCommand = ({ cmd, args }: Pick<ExecOptions, 'args' | 'cmd'>): string => `${cmd} ${args.join(' ')}`;

const exec: Exec = <Stdin extends U | W, Stdout extends R | U, Stderr extends R | U>(
  { cwd, cmd, args, envPrefix = {}, envSuffix = {}, spawnKillHandler, log }: ExecOptions,
  stdio?: { stdin: Stdin; stdout: Stdout; stderr: Stderr },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- overwrite funcs
): any => {
  const { stdin, stdout, stderr } = stdio ?? {};
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
