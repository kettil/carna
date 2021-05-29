import { promises } from 'fs';

type FunctionType = {
  (path: string): Promise<string>;
  (path: string, toJson: true): Promise<Record<string, unknown>>;
};

const readFile: FunctionType = async (path: string, toJson = false) => {
  const data = await promises.readFile(path, { encoding: 'utf8' });

  if (toJson) {
    return JSON.parse(data);
  }

  return data;
};

export { readFile };
