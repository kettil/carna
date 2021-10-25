import { constants } from 'os';
import { getStdin } from '../cli/process';

type SpawnKillCallback = (signal: NodeJS.Signals | number | undefined) => boolean;

type SpawnKillHandler = {
  addCallback: (callback: SpawnKillCallback) => void;
  kill: (signal: NodeJS.Signals | number | undefined) => boolean[];
};

const createSpawnKillHandler = ({ registerStdin = false }: { registerStdin?: boolean } = {}): SpawnKillHandler => {
  const callbacks: SpawnKillCallback[] = [];
  let isRunning = true;

  if (registerStdin) {
    const stdin = getStdin();

    stdin.setRawMode(true);
    stdin.setEncoding('utf8');
    stdin.resume();

    stdin.on('data', (key) => {
      // ctrl-c ( end of text )
      if (key.toString() === '\u0003') {
        stdin.setRawMode(false);
        stdin.pause();

        callbacks.forEach((callback) => callback(constants.signals.SIGINT));
      }
    });
  }

  return {
    addCallback: (callback) => callbacks.push(callback),
    kill: (signal) => {
      if (isRunning) {
        isRunning = false;

        return callbacks.map((callback) => callback(signal));
      }

      return [];
    },
  };
};

export type { SpawnKillHandler };
export { createSpawnKillHandler };
