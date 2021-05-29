import { promises } from 'fs';

const writeFile = async (path: string, data: Record<string, unknown> | string): Promise<void> => {
  const fileData = typeof data === 'string' ? data : JSON.stringify(data, undefined, 2);

  await promises.writeFile(path, `${fileData.trim()}\n`, { encoding: 'utf8' });
};

export { writeFile };
