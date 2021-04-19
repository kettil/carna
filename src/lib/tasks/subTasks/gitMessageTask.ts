import commitlint, { CommitlintProps } from '../../actions/tools/commitlint';
import { Task } from '../../types';

export type GitMessageProps = CommitlintProps;

const gitMessageTask: Task<GitMessageProps> = async (argv, props) => {
  await commitlint(argv, props);
};

export default gitMessageTask;
