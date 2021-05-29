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

type PrettierActionProps = {
  write?: boolean;
  extension?: string;
  files?: string[];
};

type TscActionProps = {
  mode: 'type-check' | 'type-create';
};

export type {
  BabelNodeActionProps,
  CommitlintActionProps,
  CoverageActionProps,
  CoverageWatermarkThreshold,
  EslintActionProps,
  JestActionProps,
  PrettierActionProps,
  TscActionProps,
};
