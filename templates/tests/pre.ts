/**
 * The file is called once when the test is started.
 *
 * The file can be deleted if it is not needed.
 */

const hookPre = async (): Promise<void> => {
  // code ...

  await Promise.resolve();
};

hookPre().catch((error) => {
  // eslint-disable-next-line no-console
  console.log(error);
  // eslint-disable-next-line node/no-process-exit, unicorn/no-process-exit
  process.exit(1);
});
