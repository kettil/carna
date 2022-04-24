import { noop } from '@kettil/tools';

export const parser = {
  es6: noop,
  jsx: noop,
  typescript: noop,
};

export const detector = {
  requireCallExpression: noop,
  importDeclaration: noop,
};

export const special = {
  babel: noop,
  eslint: noop,
  prettier: noop,
  jest: noop,
  husky: noop,
};

const depcheck = async (...args: unknown[]): Promise<unknown> => {
  expect(args).toMatchSnapshot('depcheck');

  return {
    dependencies: [],
    devDependencies: [],
    missing: {},
  };
};

export default depcheck;
