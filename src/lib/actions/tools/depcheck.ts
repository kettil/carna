import { red } from 'chalk';
import type { Options } from 'depcheck';
import dependenciesCheck, { parser, detector, special } from 'depcheck';
import { depcheckIgnorePackages } from '../../../configs/actionConfigs';
import { DependencyError } from '../../errors/dependencyError';
import { DependencyWarn } from '../../errors/dependencyWarn';
import type { Action } from '../../types';
import type { DepcheckActionProps } from '../types';

const options: Options = {
  ignoreDirs: ['node_modules'],
  parsers: {
    /* eslint-disable @typescript-eslint/naming-convention -- external schema */
    '**/*.js': parser.es6,
    '**/*.jsx': parser.jsx,
    '**/*.ts': parser.typescript,
    '**/*.tsx': parser.typescript,
    /* eslint-enable @typescript-eslint/naming-convention -- external schema */
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
    { title: red('The dev-dependencies are not used'), dependencies: result.devDependencies },
    { title: red('The dependencies is missing'), dependencies: Object.keys(result.missing) },
  ];

  const output = groups
    .filter(({ dependencies }) => dependencies.length > 0)
    .flatMap(({ title, dependencies }) => [`▸ ${title}`, ...dependencies.sort().map((v) => `  ∙ ${v}`), '']);

  if (output.length > 0) {
    if (Object.keys(result.missing).length > 0) {
      // Used dependencies are not installed
      throw new DependencyError('Depcheck error', output);
    }

    throw new DependencyWarn('Depcheck warning', output);
  }
};

export { depcheckAction };
