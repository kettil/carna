import { commitlintAction } from '../../actions/tools/commitlint';
import type { CommitlintActionProps } from '../../actions/types';
import type { Task } from '../../types';

type GitMessageProps = CommitlintActionProps;

const gitMessageTask: Task<GitMessageProps> = async (argv, props) => {
  await commitlintAction(argv, props);
};

export type { GitMessageProps };
export { gitMessageTask };
