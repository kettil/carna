import { isArray, isString } from '@kettil/tools';

const getCollectCoverageFrom = (workspaces: string[], customeCollectCoverageFrom?: unknown): string[] => {
  const workspacePaths = workspaces.flatMap((workspace) => [
    `${workspace}/src/**/*.{ts,tsx,js}`,
    `!${workspace}/src/**/types.ts`,
    `!${workspace}/src/index.ts`,
  ]);

  return [
    '<rootDir>/src/**/*.{ts,tsx,js}',
    '!<rootDir>/src/**/types.ts',
    '!<rootDir>/src/index.ts',

    ...workspacePaths,
    ...(isArray(customeCollectCoverageFrom) ? customeCollectCoverageFrom.filter(isString) : []),
  ];
};

export { getCollectCoverageFrom };
