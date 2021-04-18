import { createBuilder, createHandler } from '../cli/yargs';
import licenseTask, { LicenseProps } from '../tasks/licenseTask';

export const command = 'license';
export const desc = 'Run the license check';

export const handler = createHandler<LicenseProps>(licenseTask);
export const builder = createBuilder<LicenseProps>(command, (yargs) => yargs);
