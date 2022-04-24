import { promises } from 'fs';
import { isString } from '@kettil/tools';

const writeFile = async (path: string, data: Record<string, unknown> | string): Promise<void> => {
  const fileData = isString(data) ? data : JSON.stringify(data, undefined, 2);

  await promises.writeFile(path, `${fileData.trim()}\n`, { encoding: 'utf8' });
};

export { writeFile };
