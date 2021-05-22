import { dummy } from '@kettil/tool-lib';

export const parser = {
  es6: dummy,
  jsx: dummy,
  typescript: dummy,
};

export const detector = {
  requireCallExpression: dummy,
  importDeclaration: dummy,
};

export const special = {
  babel: dummy,
  eslint: dummy,
  prettier: dummy,
  jest: dummy,
  husky: dummy,
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
