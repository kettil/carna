import { promises } from 'fs';

const mkdir = async (path: string): Promise<void> => {
  await promises.mkdir(path, { recursive: true });
};

export { mkdir };
