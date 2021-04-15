import { isArray } from '@kettil/tool-lib';
import { blue, red, yellow } from 'chalk';
import dependenciesCheck, { Options, parser, detector, special } from 'depcheck';
import getConfig from '../../cli/config';
import DependencyError from '../../errors/dependencyError';
import { Action } from '../../types';

const ignorePackage = ['typescript'] as const;

const options: Options = {
  ignoreDirs: ['node_modules'],
  parsers: {
    '**/*.js': parser.es6,
    '**/*.jsx': parser.jsx,
    '**/*.ts': parser.typescript,
    '**/*.tsx': parser.typescript,
  },
  detectors: [detector.requireCallExpression, detector.importDeclaration],
  specials: [special.babel, special.eslint, special.prettier, special.jest, special.husky, special.webpack],
};

const depcheck: Action = async ({ cwd }) => {
  const configIgnoreMatches = await getConfig(cwd, 'deps.ignore.packages');
  const ignoreMatches = isArray(configIgnoreMatches)
    ? configIgnoreMatches.filter((v): v is string => typeof v === 'string')
    : [];

  const result = await dependenciesCheck(cwd, { ...options, ignoreMatches: [...ignoreMatches, ...ignorePackage] });
  const groups = [
    { title: red('The dependencies are not used'), dependencies: result.dependencies },
    { title: yellow('The dev-dependencies are not used'), dependencies: result.devDependencies },
    { title: blue('The dependencies is missing'), dependencies: Object.keys(result.missing) },
  ];

  const output = groups
    .filter(({ dependencies }) => dependencies.length > 0)
    .map(({ title, dependencies }) => [`▸ ${title}`, ...dependencies.sort().map((v) => `  ∙ ${v}`), ''])
    .flat();

  if (output.length > 0) {
    throw new DependencyError('Depcheck error', output);
  }
};

export default depcheck;
