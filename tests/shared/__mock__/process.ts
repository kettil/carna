const stdinSetRawMode = jest.fn((mode: boolean) => {
  expect({ mode }).toMatchSnapshot('process-stdin');
});

const stdinSetEncoding = jest.fn((encoding: unknown) => {
  expect({ encoding }).toMatchSnapshot('process-stdin');
});

const stdinOn = jest.fn((event: string, callback: () => void) => {
  expect({ event, callback }).toMatchSnapshot('process-stdin');
});

const getStdin = (): unknown => ({
  setRawMode: stdinSetRawMode,
  setEncoding: stdinSetEncoding,
  resume: jest.fn(),
  pause: jest.fn(),
  pipe: jest.fn(),
  on: stdinOn,
});

export { getStdin };
