import { createProject } from '../../../../../src/lib/generator/jest/createProject';

describe('createProject()', () => {
  test('it should work without workspaces', () => {
    const settings = {
      testFolder: 'unit',
      color: 'green',
    };
    const workspaces = {};

    const result = createProject(settings)('/path/to/project', workspaces);

    expect(result).toMatchSnapshot();
  });

  test('it should work with workspaces', () => {
    const settings = {
      testFolder: 'unit',
      color: 'green',
      workspaceFolder: 'foo',
    };
    const workspaces = {
      foo: '/path/to/project/packages/foo',
      bar: '/path/to/project/packages/bar',
    };

    const result = createProject(settings)('/path/to/project', workspaces);

    expect(result).toMatchSnapshot();
  });

  test('it should thrown an error', () => {
    const settings = undefined;

    const callbackWithException = () => createProject(settings)('/path/to/project', {});

    expect(callbackWithException).toThrow('createProject requires an object as the first argument');
  });
});
