import gitAdd from '../actions/git/add';
import gitStaged from '../actions/git/staged';
import eslint, { extensionAll as eslintExtensionAll } from '../actions/tools/eslint';
import prettier, { extensionAll as prettierExtensionAll } from '../actions/tools/prettier';
import {
  CommandModuleBuilder,
  CommandModuleDescribe,
  CommandModuleCommand,
  CommandModuleHandler,
  builderDefault,
  errorHandler,
} from '../lib/cli/yargs';

const testEslint = new RegExp(`(${eslintExtensionAll.replace(/,/g, '|')})$`);
const testPrettier = new RegExp(`(${prettierExtensionAll.replace(/,/g, '|')})$`);

export const command: CommandModuleCommand = 'git:commit';
export const desc: CommandModuleDescribe = 'Handler for the git commit-msg hook';

export const builder: CommandModuleBuilder = builderDefault(command, (yargs) => yargs);

export const handler: CommandModuleHandler = async (argv) => {
  try {
    const files = await gitStaged(argv, {});

    if (files.length === 0) {
      throw new Error('No stage files found');
    }

    await prettier(argv, { write: true, files: files.filter((file) => testPrettier.test(file)) });
    await eslint(argv, { write: true, files: files.filter((file) => testEslint.test(file)) });

    await gitAdd(argv, { files });
  } catch (error) {
    errorHandler(argv, error);
  }
};
