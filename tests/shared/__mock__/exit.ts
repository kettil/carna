const exit = (code = 1): never => {
  throw new Error(`exit was called with ${code}`);
};

export { exit };
