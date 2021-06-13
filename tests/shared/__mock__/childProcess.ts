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

  if (args.includes('--staged')) {
    eventEmitter.stdout.push(Buffer.from('src/index.ts\nsrc/lib/app.ts'));
    eventEmitter.stderr.push(Buffer.from('stderr'));
  } else {
    eventEmitter.stdout.push(Buffer.from('stdout'));
    eventEmitter.stderr.push(Buffer.from('stderr'));
  }

  setTimeout(() => {
    eventEmitter.emit('close', 0);
  }, 500);

  return eventEmitter;
};
