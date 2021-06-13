/**
 * The file is called once when the test environment is started.
 *
 * The file can be deleted if it is not needed.
 */

const hookPost = async (): Promise<void> => {
  // code ...

  await Promise.resolve();
};

hookPost().catch((error) => {
  // eslint-disable-next-line no-console -- helper file, without dependencies
  console.log(error);
  // eslint-disable-next-line node/no-process-exit, unicorn/no-process-exit -- helper file, without dependencies
  process.exit(1);
});
