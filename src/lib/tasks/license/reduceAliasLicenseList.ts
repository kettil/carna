import { isString } from '@kettil/tool-lib';

type Versions = Record<string, string>;

const reduceAliasLicenseList =
  ({ packageName }: { packageName: string }) =>
    (versions: Versions, [version, license]: readonly [number | string, unknown]): Versions => {
      if (!isString(version)) {
        throw new TypeError(`.carnarc.json: license.aliases.${packageName} has a key that is not a string`);
      }

      if (!isString(license)) {
        throw new TypeError(`.carnarc.json: license.aliases.${packageName}.${version} is not a string`);
      }

      return Object.assign(versions, { [version]: license });
    };

export { reduceAliasLicenseList };
