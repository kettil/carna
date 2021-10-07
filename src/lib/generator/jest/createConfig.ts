import { isArray, isObject } from '@kettil/tool-lib';
import { defaultConfig } from './defaultConfig';
import { getCollectCoverageFrom } from './getCollectCoverageFrom';
import { getWorkspaces } from './getWorkspaces';

const createConfig = (root: string, config: unknown): Record<string, unknown> => {
  if (!isObject(config)) {
    throw new TypeError('"config" is not an object');
  }

  if (!isArray(config.projects)) {
    throw new TypeError('"projects" is not an array in the "config" object');
  }

  const workspaces = getWorkspaces(root);
  const collectCoverageFrom = getCollectCoverageFrom(Object.values(workspaces), config.collectCoverageFrom);
  const projects = config.projects
    .filter(
      (project): project is Record<string, unknown> | ((...args: unknown[]) => unknown) =>
        isObject(project) || typeof project === 'function',
    )
    .map((project) => (typeof project === 'function' ? project(root, workspaces) : { ...defaultConfig, ...project }));

  return {
    ...defaultConfig,
    ...config,

    projects,
    collectCoverageFrom,
  };
};

export { createConfig };
