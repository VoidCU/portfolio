export const links: Record<string, Record<string, number>> = {
  A: { B: 4, C: 2 },
  B: { D: 3, E: 6 },
  C: { B: 1, D: 7, E: 4 },
  D: { F: 3 },
  E: { D: 1, F: 5 },
  F: {},
};
export function flipGrid(board: boolean[], index: number) {
  const copy = [...board];
  [
    index,
    index - 5,
    index + 5,
    index % 5 > 0 ? index - 1 : -1,
    index % 5 < 4 ? index + 1 : -1,
  ]
    .filter((i) => i >= 0 && i < 25)
    .forEach((i) => (copy[i] = !copy[i]));
  return copy;
}
export const startingGrid = [0, 2, 6, 12, 17, 23].reduce(
  (board, index) => flipGrid(board, index),
  Array<boolean>(25).fill(true),
);
export function routeCost(route: string[]) {
  return route
    .slice(1)
    .reduce((cost, node, i) => cost + (links[route[i]][node] ?? Infinity), 0);
}
