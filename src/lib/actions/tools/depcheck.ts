import { blue, red, yellow } from 'chalk';
import dependenciesCheck, { Options, parser, detector, special } from 'depcheck';
import { depcheckIgnorePackages } from '../../../configs/actionConfigs';
import { DependencyError } from '../../errors/dependencyError';
import { Action } from '../../types';
import { DepcheckActionProps } from '../types';

const options: Options = {
  ignoreDirs: ['node_modules'],
  parsers: {
    '**/*.js': parser.es6,
    '**/*.jsx': parser.jsx,
    '**/*.ts': parser.typescript,
    '**/*.tsx': parser.typescript,
  },
  detectors: [detector.requireCallExpression, detector.importDeclaration],
  specials: [special.babel, special.eslint, special.prettier, special.jest, special.husky],
};

const depcheckAction: Action<DepcheckActionProps> = async ({ log }, { path, ignorePackages = [] }) => {
  log.debug('Create the dependency list');

  const result = await dependenciesCheck(path, {
    ...options,
    ignoreMatches: [...ignorePackages, ...depcheckIgnorePackages],
  });

  const groups = [
    { title: red('The dependencies are not used'), dependencies: result.dependencies },
    { title: yellow('The dev-dependencies are not used'), dependencies: result.devDependencies },
    { title: blue('The dependencies is missing'), dependencies: Object.keys(result.missing) },
  ];

  const output = groups
    .filter(({ dependencies }) => dependencies.length > 0)
    .flatMap(({ title, dependencies }) => [`▸ ${title}`, ...dependencies.sort().map((v) => `  ∙ ${v}`), '']);

  if (output.length > 0) {
    throw new DependencyError('Depcheck error', output);
  }
};

export { depcheckAction };
