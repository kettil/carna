const exit = (code = 1): never => {
  /* eslint-disable-next-line node/no-process-exit, unicorn/no-process-exit */
  process.exit(code);
};

export default exit;
