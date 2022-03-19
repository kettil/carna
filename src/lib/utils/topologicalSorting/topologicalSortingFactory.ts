import type { TopologicalSortingUtil } from './topologicalSortingUtil';
import { topologicalSortingUtil } from './topologicalSortingUtil';

const topologicalSortingFactory = <T extends number | string>(
  nodes: T[],
): {
  addEdge: (fromNode: T, toNode: T) => void;
  getSortedNode: () => T[];
} => {
  const edges = Object.fromEntries(nodes.map((k) => [k, [] as T[]])) as Record<T, T[]>;

  return {
    addEdge: (fromNode: T, toNode: T): void => {
      edges[fromNode].push(toNode);
    },
    getSortedNode: () =>
      nodes.reduce<TopologicalSortingUtil<T>>(
        (rData, rNode) => (rData.visited[rNode] ? rData : topologicalSortingUtil(rNode, rData)),
        { edges, stack: [], visited: {} as TopologicalSortingUtil<T>['visited'] },
      ).stack,
  };
};

export { topologicalSortingFactory };
