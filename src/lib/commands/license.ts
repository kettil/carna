import { createBuilder, createHandler } from '../cli/yargs';
import type { LicenseProps } from '../tasks/licenseTask';
import { licenseTask } from '../tasks/licenseTask';

const command = 'license';
const desc = 'Run license check';

const handler = createHandler<LicenseProps>(licenseTask);
const builder = createBuilder<LicenseProps>(command, (yargs) => yargs);

export { command, desc, builder, handler };
