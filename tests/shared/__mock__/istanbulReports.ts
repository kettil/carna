import { isObject } from '@kettil/tools';

export const create = jest.fn((...args: unknown[]) => {
  expect(args).toMatchSnapshot('istanbul-reports');

  return {
    execute: jest.fn((context: unknown) => {
      expect(isObject(context)).toBeTruthy();
    }),
  };
});
