const mockOra = (): unknown => ({
  start: jest.fn(),
  isSpinning: jest.fn().mockReturnValue(false),
  fail: jest.fn(),
  info: jest.fn(),
  stop: jest.fn(),
  succeed: jest.fn(),
  warn: jest.fn(),
});

export default mockOra;
