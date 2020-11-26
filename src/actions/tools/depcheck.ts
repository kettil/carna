import { red } from 'chalk';
import dependenciesCheck, { Options, parser, detector, special } from 'depcheck';
import DependencyError from '../../lib/errors/dependencyError';
import { Action } from '../../lib/types';

const options: Options = {
  ignoreDirs: ['node_modules'],
  parsers: {
    '*.js': parser.es6,
    '*.jsx': parser.jsx,
    '*.ts': parser.typescript,
    '*.tsx': parser.typescript,
  },
  detectors: [detector.requireCallExpression, detector.importDeclaration],
  specials: [special.babel, special.eslint, special.prettier, special.jest, special.husky, special.webpack],
};

const depcheck: Action = async ({ cwd }) => {
  const { dependencies, devDependencies, invalidDirs, invalidFiles } = await dependenciesCheck(cwd, options);

  const msg: string[] = [];

  if (Object.keys(invalidDirs).length > 0) {
    msg.push(red('No access to the folders:'));

    Object.keys(invalidDirs)
      .sort()
      .forEach((file) => {
        msg.push(`- ${file}`);
      });

    msg.push('');
  }

  if (Object.keys(invalidFiles).length > 0) {
    msg.push(red('No access or syntax error in the files:'));

    Object.keys(invalidFiles)
      .sort()
      .forEach((file) => {
        msg.push(`- ${file}`);
      });

    msg.push('');
  }

  if (dependencies.length > 0 || devDependencies.length > 0) {
    msg.push(red('The dependencies are not used:'));

    dependencies
      .concat(devDependencies)
      .sort()
      .forEach((file) => {
        msg.push(`- ${file}`);
      });
  }

  if (msg.length > 0) {
    throw new DependencyError('Depcheck error', msg);
  }
};

export default depcheck;
