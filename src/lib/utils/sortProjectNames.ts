import { SortType } from '../types';

const sortProjectNames =
  (specialKeys: string[]): SortType<string> =>
    (valueA, valueB) => {
      const normaliseValueA = valueA.toLowerCase();
      const normaliseValueB = valueB.toLowerCase();

      const indexOfA = specialKeys.findIndex((key) => normaliseValueA.includes(key));
      const indexOfB = specialKeys.findIndex((key) => normaliseValueB.includes(key));

      if (indexOfA !== indexOfB) {
        if (indexOfA >= 0 && indexOfB >= 0) {
          return indexOfA - indexOfB;
        }

        if (indexOfA >= 0) {
          return -1;
        }

        return 1;
      }

      if (normaliseValueA < normaliseValueB) {
        return -1;
      }

      if (normaliseValueA > normaliseValueB) {
        return 1;
      }

      return 0;
    };

export { sortProjectNames };
