import { existFiles } from '../../../../src/lib/cmd/existFiles';
import { getBabelConfigPath } from '../../../../src/lib/utils/getConfigPath';

jest.mock('../../../../src/lib/cmd/existFiles');

describe('getBabelConfigPath()', () => {
  test('it should work with cwd path', async () => {
    const root = '/path/to/project';
    const cwd = '/path/to/project';

    (existFiles as jest.Mock).mockResolvedValue([`${cwd}/config.json`]);

    const promise = getBabelConfigPath({ cwd, root });

    await expect(promise).resolves.toBe(`${cwd}/config.json`);
    expect(existFiles).toHaveBeenCalledTimes(1);
  });

  test("it should throw an error if don't exist files", async () => {
    const root = '/path/to/project';
    const cwd = '/path/to/project';

    (existFiles as jest.Mock).mockResolvedValue([]);

    const promise = getBabelConfigPath({ cwd, root });

    await expect(promise).rejects.toThrow('None of the following files were found: babel.config.js, babel.config.json');
    expect(existFiles).toHaveBeenCalledTimes(1);
  });

  test('it should work with root path', async () => {
    const root = '/path/to/project';
    const cwd = '/path/to/project/packages/foo';

    (existFiles as jest.Mock).mockResolvedValueOnce([]);
    (existFiles as jest.Mock).mockResolvedValue([`${root}/config.json`]);

    const promise = getBabelConfigPath({ cwd, root });

    await expect(promise).resolves.toBe(`${root}/config.json`);
    expect(existFiles).toHaveBeenCalledTimes(2);
  });
});
