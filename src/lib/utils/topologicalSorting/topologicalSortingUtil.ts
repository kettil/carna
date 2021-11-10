type TopologicalSortingUtil<T extends number | string> = {
  stack: T[];
  visited: Record<T, boolean>;
  edges: Record<T, T[]>;
};

const topologicalSortingUtil = <T extends number | string>(
  node: T,
  { edges, stack, visited }: TopologicalSortingUtil<T>,
): TopologicalSortingUtil<T> => {
  const data = edges[node].reduce<TopologicalSortingUtil<T>>(
    (rData, rNode) => (rData.visited[rNode] ? rData : topologicalSortingUtil(rNode, rData)),
    { edges, stack: [...stack], visited: { ...visited, [node]: true } },
  );

  data.stack.unshift(node);

  return data;
};

export type { TopologicalSortingUtil };

export { topologicalSortingUtil };
