import { join } from 'path';
import { objectEntries } from '@kettil/tool-lib';
import { readFile } from '../../cmd/readFile';
import { writeFile } from '../../cmd/writeFile';
import { Action } from '../../types';

type TemplateVariable = Record<string, boolean | number | string> | boolean | string | undefined;

type Props = {
  source: string;
  target?: string;
  variables: Record<string, TemplateVariable>;
};

const replaceKey = (text: string, key: string, value: TemplateVariable): string => {
  const keyUpper = key.toUpperCase();
  const a = `%${keyUpper}%`;
  const b = `'%${keyUpper}%'`;
  const c = `"%${keyUpper}%"`;

  if (typeof value === 'undefined') {
    return text.replace(new RegExp([a, b, c].join('|'), 'g'), '');
  }

  if (typeof value === 'boolean') {
    return text.replace(new RegExp([b, c].join('|'), 'g'), value ? 'true' : 'false');
  }

  if (typeof value === 'object') {
    return text.replace(new RegExp([b, c].join('|'), 'g'), JSON.stringify(value));
  }

  return text.replace(new RegExp(a, 'g'), value);
};

const nodeTemplateAction: Action<Props> = async ({ cwd, tpl, log }, { source, target = source, variables }) => {
  try {
    log.debug(`Read the template file ${source}`);

    const content = await readFile(join(tpl, source));

    log.info(`Create the template file ${target}`);

    await writeFile(
      join(cwd, target),
      objectEntries(variables).reduce((text, [key, value]) => replaceKey(text, key, value), content),
    );
  } catch (error) {
    log.error(`Can not create the template\n${source} -> ${target}`);

    throw error;
  }
};

export type { TemplateVariable };
export { nodeTemplateAction };
