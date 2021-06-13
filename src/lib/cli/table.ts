const defaultBorder = {
  t: '─',
  tl: '┌',
  tb: '┬',
  tr: '┐',

  l: '│',
  lr: '├',

  c: '┼',
  ch: '─',
  cv: '│',

  r: '│',
  rl: '┤',

  b: '─',
  bl: '└',
  bt: '┴',
  br: '┘',
};

type Border = typeof defaultBorder;
type TableBorder = (columnLengths: number[], line: string, first: string, cross: string, last: string) => string;
type TableRow = (columnLengths: number[], row: string[], separator: string, first: string, last: string) => string;

const cleanCliValue = (v: string): string => v.replace(/(\u{1B})?\[\d{1,2}m/gu, '');

const getMaxColumnLengths = (maxLengths: number[], row: string[]): number[] => {
  if (maxLengths.length > 0 && maxLengths.length !== row.length) {
    throw new Error('The table rows are of different lengths');
  }

  return row
    .map((value) => cleanCliValue(value).length)
    .map((value, index) => (typeof maxLengths[index] === 'number' ? Math.max(maxLengths[index], value) : value));
};

const cellFill = (cell: string, length: number): string => cell + ' '.repeat(length - cleanCliValue(cell).length);

const tableBorder: TableBorder = (columnLengths, line, first, cross, last) =>
  first + line + columnLengths.map((l) => line.repeat(l)).join(line + cross + line) + line + last;

const tableRow: TableRow = (columnLengths, row, separator, first, last) =>
  `${first} ${columnLengths.map((length, i) => cellFill(row[i], length)).join(` ${separator} `)} ${last}`;

const table = (rows: string[][], border: Border = defaultBorder): string => {
  const { b, bl, br, bt, c, ch, cv, l, lr, r, rl, t, tb, tl, tr } = border;
  const columnLengths = rows.reduce(getMaxColumnLengths, []);
  const separator = tableBorder(columnLengths, ch, lr, c, rl);

  return [
    tableBorder(columnLengths, t, tl, tb, tr),
    rows.map((row) => tableRow(columnLengths, row, cv, l, r)).join(`\n${separator}\n`),
    tableBorder(columnLengths, b, bl, bt, br),
  ].join('\n');
};

export { table };
