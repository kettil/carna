import { Watermark, Watermarks } from 'istanbul-lib-report';

type BabelNodeActionProps = {
  watch: boolean;
  script?: string;
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
  ignorePackages: string[];
  path?: string;
};

type PrettierActionProps = {
  write?: boolean;
  extension?: string;
  files?: string[];
};

type SemverActionProps = {
  path?: string;
};

type TscActionProps = {
  mode: 'type-check' | 'type-create';
};

export type {
  BabelNodeActionProps,
  CommitlintActionProps,
  CoverageActionProps,
  CoverageWatermarkThreshold,
  DepcheckActionProps,
  EslintActionProps,
  JestActionProps,
  LicensecheckActionProps,
  PrettierActionProps,
  SemverActionProps,
  TscActionProps,
};
