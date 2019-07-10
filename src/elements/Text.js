import { Base } from '../primitives/Base';
import { TYPOGRAPHY } from '../primitives/constants';

export const Text = Base('p')`
  white-space: pre-line;
  ${TYPOGRAPHY}
`;

Text.defaultProps = {
  fontSize: 'md',
};
