import { themeGet } from 'styled-system';

import { Base } from '../../primitives/Base';
import { px2rem } from '../../config/utils';

export const FieldErrorMessage = Base('b')`
  bottom: ${px2rem(4)};
  color: ${themeGet('colors.danger')};
  font-size: ${themeGet('fontSizes.xs')};
  position: absolute;
  right: 0;
`;
