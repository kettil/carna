import { topologicalSortingFactory } from '../../../../src/lib/utils/topologicalSorting';

describe('topologicalSortingFactory()', () => {
  test('it should work with 3 nodes', () => {
    const topologicalSorting = topologicalSortingFactory(['a', 'b', 'c']);

    topologicalSorting.addEdge('c', 'a');

    expect(topologicalSorting.getSortedNode()).toEqual(['c', 'b', 'a']);
  });

  test('it should work with 5 nodes', () => {
    const topologicalSorting = topologicalSortingFactory([0, 1, 2, 3, 4]);

    topologicalSorting.addEdge(0, 1);
    topologicalSorting.addEdge(0, 3);
    topologicalSorting.addEdge(1, 2);
    topologicalSorting.addEdge(2, 3);
    topologicalSorting.addEdge(2, 4);
    topologicalSorting.addEdge(3, 4);

    expect(topologicalSorting.getSortedNode()).toEqual([0, 1, 2, 3, 4]);
  });

  test('it should work with 6 nodes', () => {
    const topologicalSorting = topologicalSortingFactory(['a', 'b', 'c', 'd', 'e', 'f']);

    topologicalSorting.addEdge('d', 'c');
    topologicalSorting.addEdge('a', 'd');
    topologicalSorting.addEdge('e', 'd');
    topologicalSorting.addEdge('f', 'a');
    topologicalSorting.addEdge('a', 'e');

    expect(topologicalSorting.getSortedNode()).toEqual(['f', 'b', 'a', 'e', 'd', 'c']);
  });
});
