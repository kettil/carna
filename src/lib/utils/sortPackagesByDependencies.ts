import { SortType } from '../types';

const sortPackagesByDependencies: SortType<[string, string[]]> = ([k1, v1], [k2, v2]) => {
  if (v1.includes(k2)) {
    return 1;
  }

  if (v2.includes(k1)) {
    return -1;
  }

  return v1.length - v2.length;
};

export { sortPackagesByDependencies };
