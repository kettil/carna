import commitlint, { Props as CommitlintProps } from '../../actions/tools/commitlint';
import { Action } from '../../lib/types';

export type Props = CommitlintProps;

const msg: Action<Props> = async (argv, props) => {
  await commitlint(argv, props);
};

export default msg;
