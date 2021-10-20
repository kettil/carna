import { isArray, isObject, isString } from '@kettil/tool-lib';
import { jestCommand, jestConfigFiles, jestPreOrderProjects } from '../../configs/actionConfigs';
import { exec } from '../cmd/exec';
import { Task } from '../types';
import { getFirstExistingFile } from './getFirstExistingFile';
import { sortProjectNames } from './sortProjectNames';

const getTestProjects: Task<[string[] | undefined], string[]> = async ({ root, log }, selectedProjects) => {
  const configFile = await getFirstExistingFile({ cwd: root, files: jestConfigFiles });
  const args: string[] = ['--config', configFile, '--showConfig'];

  const { stdout } = await exec({ cmd: jestCommand, args, cwd: root, log });

  const data = JSON.parse(stdout.trim()) as unknown;

  const projects =
    isObject(data) && isArray(data.configs)
      ? data.configs
        .filter(isObject)
        .map((config) => (isObject(config.displayName) ? config.displayName.name : config.displayName))
        .filter(isString)
        .map((name) => name.split(':').reverse().join(':'))
        .sort(sortProjectNames(jestPreOrderProjects))
        .map((name) => name.split(':').reverse().join(':'))
      : [];

  const logProjects = projects.map((name) => `▸ ${name}`).join('\n');

  log.info(`Found following test project(s):\n${logProjects}`);

  if (selectedProjects === undefined || selectedProjects.length === 0) {
    return projects;
  }

  const unknownProjects = selectedProjects.filter((v) => !projects.includes(v));

  if (unknownProjects.length > 0) {
    throw new Error(`The following test project(s) are unknown: ${unknownProjects.join(', ')}`);
  }

  const runningProjects = projects.filter((v) => selectedProjects.includes(v));
  const logRunningProjects = runningProjects.map((name) => `▸ ${name}`).join('\n');

  log.info(`Run the following test project(s):\n${logRunningProjects}`);

  return runningProjects;
};

export { getTestProjects };
