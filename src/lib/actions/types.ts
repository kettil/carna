import type { Watermark, Watermarks } from 'istanbul-lib-report';
import type { LicenseConfig } from '../types';
import type { SpawnKillHandler } from '../utils/createSpawnKillHandler';

type BabelActionProps = {
  watch?: boolean;
  skipInitialBuild?: boolean;
  spawnKillHandler?: SpawnKillHandler;
};

type BabelNodeActionProps = {
  watch: boolean;
  scriptPath: string;
  watchPaths?: string[];
  withPinoPretty?: boolean;
  pinoIgnoreKeys?: string[];
  clearConsole?: boolean;
  executePath?: string;
};

type CommitlintActionProps = {
  edit: string;
};

type CoverageWatermarkThreshold = Watermark | number | undefined;
type CoverageActionProps = {
  projects: string[];
  watermarks?: Partial<Record<keyof Watermarks, CoverageWatermarkThreshold>>;
};

type DepcheckActionProps = {
  path: string;
  ignorePackages?: string[];
};

type EslintActionProps = {
  write?: boolean;
  files?: string[];
};

type JestActionProps = {
  projects: string[];
  updateSnapshot?: boolean;
  runInBand?: boolean;
  verbose?: boolean;
  watch?: boolean;
};

type LicensecheckActionProps = {
  licenseConfig: LicenseConfig;
  path?: string;
};

type PrettierActionProps = {
  write?: boolean;
  extension?: string;
  files?: string[];
};

type TscActionProps = {
  mode: 'type-check' | 'type-create';
};

export type {
  BabelActionProps,
  BabelNodeActionProps,
  CommitlintActionProps,
  CoverageActionProps,
  CoverageWatermarkThreshold,
  DepcheckActionProps,
  EslintActionProps,
  JestActionProps,
  LicensecheckActionProps,
  PrettierActionProps,
  TscActionProps,
};
