const exit = (code = 1): never => {
  /* eslint-disable-next-line node/no-process-exit, unicorn/no-process-exit -- is a exit wrapper */
  process.exit(code);
};

export { exit };
