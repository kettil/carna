import { readdir } from 'fs/promises';
import { join } from 'path';
import { PropsGlobal } from '../../types';

const ignoreFolders = new Set(['helpers', 'type']);
const specialFolders = ['unit', 'integration', 'e2e'];

export type Props = Pick<PropsGlobal, 'cwd'> & {
  project?: string;
};

const getProjects = async ({ cwd, project }: Props): Promise<string[]> => {
  const files = await readdir(join(cwd, 'tests'), { withFileTypes: true });

  const folders = files
    .filter((file) => file.isDirectory() && !file.name.startsWith('.'))
    .map((folder) => folder.name)
    .filter((folder) => !ignoreFolders.has(folder));

  const projects = [
    ...specialFolders.filter((folder) => folders.includes(folder)),
    ...folders.filter((folder) => !specialFolders.includes(folder)),
  ];

  if (project === undefined || project === '') {
    return projects;
  }

  const selectedProjects = project.split(',');
  const unknownProjects = selectedProjects.filter((v) => !projects.includes(v));

  if (unknownProjects.length > 0) {
    throw new Error(`The following projects are unknown: ${unknownProjects.join(', ')}`);
  }

  return projects.filter((v) => selectedProjects.includes(v));
};

export default getProjects;
