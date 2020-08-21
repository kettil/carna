import { promises } from 'fs';

const writeFile = async (path: string, data: string | Record<string, unknown>): Promise<void> => {
  const fileData = typeof data === 'string' ? data : JSON.stringify(data, undefined, 2);

  await promises.writeFile(path, `${fileData.trim()}\n`, { encoding: 'utf8' });
};

export default writeFile;
