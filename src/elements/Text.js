import { Base } from '../primitives/Base';
import { TYPOGRAPHY } from '../primitives/constants';

export const Text = Base('p')(TYPOGRAPHY);

Text.defaultProps = {
  fontSize: 'md',
};
