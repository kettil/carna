import { promises } from 'fs';

type FunctionType = {
  (path: string): Promise<string>;
  (path: string, toJson: true): Promise<Record<string, unknown>>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- is needed for the function overload
const readFile: FunctionType = async (path: string, toJson = false): Promise<any> => {
  const data = await promises.readFile(path, { encoding: 'utf8' });

  if (toJson === true) {
    return JSON.parse(data) as Promise<Record<string, unknown>>;
  }

  return data;
};

export { readFile };
