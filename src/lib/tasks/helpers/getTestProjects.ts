import { readdir } from 'fs/promises';
import { join } from 'path';
import { isArray } from '@kettil/tool-lib';
import getConfig from '../../cli/config';
import { Task } from '../../types';

const ignoreFolders = new Set(['shared', 'type']);
const specialFolders = ['unit', 'integration', 'e2e'];
const defaultCoverageProjects = ['unit', 'integration'];

const getTestProjects: Task<[string[] | undefined, boolean | undefined], string[]> = async (
  { cwd },
  selectedProjects,
  withCoverage,
) => {
  const files = await readdir(join(cwd, 'tests'), { withFileTypes: true });

  const folders = files
    .filter((file) => file.isDirectory() && !file.name.startsWith('.'))
    .map((folder) => folder.name)
    .filter((folder) => !ignoreFolders.has(folder));

  const projects = [
    ...specialFolders.filter((folder) => folders.includes(folder)),
    ...folders.filter((folder) => !specialFolders.includes(folder)),
  ];

  if (selectedProjects === undefined || selectedProjects.length === 0) {
    if (withCoverage) {
      const configCoverageProjects = await getConfig(cwd, 'test.coverage.projects');

      return isArray(configCoverageProjects) && configCoverageProjects.length > 0
        ? configCoverageProjects.filter((v): v is string => typeof v === 'string')
        : defaultCoverageProjects;
    }

    return projects;
  }

  const unknownProjects = selectedProjects.filter((v) => !projects.includes(v));

  if (unknownProjects.length > 0) {
    throw new Error(`The following test project(s) are unknown: ${unknownProjects.join(', ')}`);
  }

  return projects.filter((v) => selectedProjects.includes(v));
};

export default getTestProjects;
