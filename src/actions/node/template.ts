import { join } from 'path';
import { objectEntries } from '@kettil/tool-lib';
import readFile from '../../lib/cmd/readFile';
import writeFile from '../../lib/cmd/writeFile';
import { Action } from '../../lib/types';

type Props = {
  source: string;
  target?: string;
  variables: Record<string, string | undefined>;
};

const nodeTemplate: Action<Props> = async ({ cwd, tpl, log }, { source, target = source, variables }) => {
  try {
    log.debug(`Read the template file ${source}`);

    const content = await readFile(join(tpl, source));

    log.info(`Create the template file ${target}`);

    await writeFile(
      join(cwd, target),
      objectEntries(variables).reduce(
        (text, [key, value]) => text.replace(new RegExp(`%${key.toUpperCase()}%`, 'g'), value ?? ''),
        content,
      ),
    );
  } catch (error) {
    log.error(`Can not create the template\n${source} -> ${target}`);

    throw error;
  }
};

export default nodeTemplate;
