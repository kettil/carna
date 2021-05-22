import { Argv } from 'yargs';
import { handler, builder, command, desc } from '../../../src/lib/commands/init';
import { PropsGlobal } from '../../../src/lib/types';

describe('command init', () => {
  test('it should be complete the yargs command structure', () => {
    expect(typeof command).toBe('string');
    expect(typeof desc).toBe('string');
    expect(typeof builder).toBe('function');
    expect(typeof handler).toBe('function');
  });

  test('it should be create the expected builder', () => {
    const yargs = {
      options: jest.fn((...args: unknown[]) => {
        expect(args).toMatchSnapshot('options');

        return yargs;
      }),
      usage: jest.fn((...args: unknown[]) => {
        expect(args).toMatchSnapshot('usage');

        return yargs;
      }),

      help: jest.fn(() => yargs),
      version: jest.fn(() => yargs),
      showHelpOnFail: jest.fn(() => yargs),
    } as unknown as Argv<PropsGlobal>;

    builder(yargs);
  });
});
