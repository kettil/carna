import { spawn, ChildProcessByStdio, ChildProcessWithoutNullStreams } from 'child_process';
import { env as processEnvironment } from '@kettil/tool-lib';
import { Logger } from '../cli/logger';
import { ExecutableError } from '../errors/executableError';
import type { SpawnKillHandler } from '../utils/createSpawnKillHandler';

type Options = {
  readonly cmd: string;
  readonly args: readonly string[];
  readonly withInteraction?: boolean;
  readonly withDirectOutput?: boolean;
  readonly spawnKillHandler?: SpawnKillHandler;

  readonly cwd: string;
  readonly envPrefix?: NodeJS.ProcessEnv;
  readonly envSuffix?: NodeJS.ProcessEnv;

  readonly log: Logger;
};

const exec = ({
  cwd,
  cmd,
  args,
  withInteraction,
  withDirectOutput,
  spawnKillHandler,
  envPrefix = {},
  envSuffix = {},
  log,
}: Options): Promise<{ stdout: string; stderr: string; output: string }> =>
  new Promise<{ stdout: string; stderr: string; output: string }>((resolve, reject) => {
    const command = `${cmd} ${args.join(' ')}`;
    const env = { ...envPrefix, ...processEnvironment(), ...envSuffix };

    log.info(`\ncwd:  ${cwd}`);
    log.info(`exec: ${command}`);

    let stream: ChildProcessByStdio<null, null, null> | ChildProcessWithoutNullStreams;
    let output = '';
    let stdout = '';
    let stderr = '';

    if (withInteraction) {
      stream = spawn(cmd, args, { cwd, env, shell: true, stdio: [process.stdin, process.stdout, process.stderr] });
    } else {
      stream = spawn(cmd, args, { cwd, env, shell: true });

      if (withDirectOutput) {
        stream.stdout.on('data', (entry) => {
          log.log(String(entry));
        });

        stream.stderr.on('data', (entry) => {
          log.log(String(entry));
        });
      } else {
        stream.stdout.on('data', (data) => {
          const value = String(data);

          output += value;
          stdout += value;

          log.debug(value);
        });

        stream.stderr.on('data', (data) => {
          const value = String(data);

          output += value;
          stderr += value;

          log.debug(value);
        });
      }
    }

    if (spawnKillHandler) {
      spawnKillHandler.addCallback((signal) => stream.kill(signal));
    }

    stream.on('close', (code) => {
      if (typeof code === 'number' && code !== 0) {
        reject(new ExecutableError(output, command, code));
      } else {
        resolve({ stdout, stderr, output });
      }
    });
  });

export { exec };
