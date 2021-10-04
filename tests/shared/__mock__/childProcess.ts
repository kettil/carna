import { SpawnOptionsWithoutStdio, ChildProcessWithoutNullStreams } from 'child_process';
import EventEmitter from 'events';
import { Readable } from 'stream';

export const spawn = (
  command: string,
  args: readonly string[] = [],
  { cwd }: SpawnOptionsWithoutStdio = {},
): ChildProcessWithoutNullStreams => {
  expect({ command, args, cwd }).toMatchSnapshot('child-process');

  const eventEmitter = new EventEmitter() as ChildProcessWithoutNullStreams;

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
