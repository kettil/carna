import { join } from 'path';

const glob = (pattern: string, options: { cwd: string }, callback: (error: unknown, data: string[]) => void): void => {
  expect({ pattern, options }).toMatchSnapshot('glob');

  const values = ['a', 'b', 'c'].map((v) => join(options.cwd, 'packages', v));

  callback(undefined, values);
};

export { glob };
