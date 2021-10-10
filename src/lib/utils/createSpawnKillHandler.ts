type SpawnKillCallback = (signal: NodeJS.Signals | number | undefined) => boolean;

type SpawnKillHandler = {
  addCallback: (callback: SpawnKillCallback) => void;
  kill: (signal: NodeJS.Signals | number | undefined) => boolean[];
};

const createSpawnKillHandler = (): SpawnKillHandler => {
  const callbacks: SpawnKillCallback[] = [];

  return {
    addCallback: (callback) => callbacks.push(callback),
    kill: (signal) => callbacks.map((callback) => callback(signal)),
  };
};

export type { SpawnKillHandler };
export { createSpawnKillHandler };
