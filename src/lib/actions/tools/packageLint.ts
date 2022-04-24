import { join } from 'path';
import { red, magenta } from 'chalk';
import { NpmPackageJsonLint } from 'npm-package-json-lint';
import { packageLintFiles } from '../../../configs/actionConfigs';
import { MessageError } from '../../errors/messageError';
import type { Action } from '../../types';
import { getFirstExistingFile } from '../../utils/getFirstExistingFile';

type PackageLintActionProps = {
  mode: keyof typeof packageLintFiles;
  path?: string;
};

const packageLintAction: Action<PackageLintActionProps> = async (argv, { mode, path = argv.root }) => {
  const { root, cfg, log } = argv;

  const configFile = await getFirstExistingFile({
    cwd: root,
    files: packageLintFiles[mode],
    defaultFile: join(cfg, `npmpackagejsonlintrc.${mode}.json`),
  });

  log.debug(`Check the package.json (mode: ${mode})`);
  log.debug(`▸ Config: ${configFile}`);
  log.debug(`▸ File: ${path}/package.json`);

  const npmPackageJsonLint = new NpmPackageJsonLint({
    cwd: path,
    configFile,
    patterns: ['./package.json'],
  });

  const { results } = npmPackageJsonLint.lint();

  if (results.length > 1) {
    throw new Error('More than one package.json was checked.');
  }

  const result = results.at(0);

  if (!result) {
    throw new Error('No package.json was checked.');
  }

  if (result.issues.length > 0) {
    const message = result.issues
      .map(({ lintId, node, lintMessage }) => {
        const key = node === '' ? 'global' : node;
        const description = lintMessage
          .split('. ')
          .map((v) => `  ∙ ${v.trim()}`)
          .join('\n');

        return `▸ ${red(key)}: ${magenta(lintId)}\n${description}`;
      })
      .join('\n');

    throw new MessageError(message);
  }
};

export type { PackageLintActionProps };
export { packageLintAction };
