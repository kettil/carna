import { uniqueArray } from '@kettil/tool-lib';
import { eslintExtensions, prettierExtensions } from '../../configs/actionConfigs';

const testEslint = new RegExp(`(${eslintExtensions.replaceAll(',', '|')})$`, 'u');
const testPrettier = new RegExp(`(${prettierExtensions.replaceAll(',', '|')})$`, 'u');

const cleanAnalyseFiles = (
  files: string[],
): { eslintFiles: string[]; prettierFiles: string[]; mergedFiles: string[] } => {
  const eslintFiles = files.filter((file) => testEslint.test(file));
  const prettierFiles = files.filter((file) => testPrettier.test(file));
  const mergedFiles = uniqueArray([...prettierFiles, ...eslintFiles]);

  return { eslintFiles, prettierFiles, mergedFiles };
};

export { cleanAnalyseFiles };
