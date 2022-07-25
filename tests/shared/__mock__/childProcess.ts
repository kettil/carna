import type { SpawnOptionsWithoutStdio, ChildProcessWithoutNullStreams } from 'child_process';
import EventEmitter from 'events';
import { Readable } from 'stream';

const spawnKill = jest.fn((signal?: NodeJS.Signals | number) => {
  expect(signal).toMatchSnapshot('spawn');
});

export const spawn = (
  command: string,
  args: readonly string[] = [],
  { cwd, env = {} }: SpawnOptionsWithoutStdio = {},
): ChildProcessWithoutNullStreams => {
  const processEnvironmentKeys = Object.keys(process.env);
  const envFiltered = Object.fromEntries(Object.entries(env).filter(([key]) => !processEnvironmentKeys.includes(key)));

  expect({ command, args, cwd, env: envFiltered }).toMatchSnapshot('child-process');

  // eslint-disable-next-line unicorn/prefer-event-target -- mock function
  const eventEmitter = new EventEmitter() as ChildProcessWithoutNullStreams;

  eventEmitter.kill = spawnKill as unknown as ChildProcessWithoutNullStreams['kill'];
  eventEmitter.stdout = new Readable({ read: () => true });
  eventEmitter.stderr = new Readable({ read: () => true });

  let stdoutContent = 'stdout';
  const stderrContent = 'stderr';

  if (command.includes('jest') && args.includes('--showConfig')) {
    stdoutContent = JSON.stringify({
      configs: [{ displayName: 'unit' }, { displayName: { name: 'e2e', color: 'black' } }],
    });
  } else if (args.includes('--staged')) {
    stdoutContent = 'src/index.ts\nsrc/lib/app.ts';
  }

  eventEmitter.stdout.push(Buffer.from(stdoutContent));
  eventEmitter.stderr.push(Buffer.from(stderrContent));

  setTimeout(() => {
    eventEmitter.emit('close', 0);
  }, 500);

  return eventEmitter;
};
