import { readdir } from 'fs/promises';
import { join } from 'path';
import { Task } from '../../types';

const ignoreFolders = new Set(['shared', 'type']);
const specialFolders = ['unit', 'integration', 'e2e'];

const getTestProjects: Task<[string[] | undefined], string[]> = async ({ cwd }, selectedProjects) => {
  const files = await readdir(join(cwd, 'tests'), { withFileTypes: true });

  const folders = files
    .filter((file) => file.isDirectory() && !file.name.startsWith('.'))
    .map((folder) => folder.name)
    .filter((folder) => !ignoreFolders.has(folder))
    .sort();

  const projects = [
    ...specialFolders.filter((folder) => folders.includes(folder)),
    ...folders.filter((folder) => !specialFolders.includes(folder)),
  ];

  if (selectedProjects === undefined || selectedProjects.length === 0) {
    return projects;
  }

  const unknownProjects = selectedProjects.filter((v) => !projects.includes(v));

  if (unknownProjects.length > 0) {
    throw new Error(`The following test project(s) are unknown: ${unknownProjects.join(', ')}`);
  }

  return projects.filter((v) => selectedProjects.includes(v));
};

export default getTestProjects;
