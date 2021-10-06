const getPathFromNodeModulesParent = (path: string, defaultPath: string): string => {
  const indexOfNodeModules = path.toLowerCase().indexOf('node_modules');

  return indexOfNodeModules >= 0 ? path.slice(0, indexOfNodeModules - 1) : defaultPath;
};

export { getPathFromNodeModulesParent };
