import { Base } from '../../primitives/Base';

import { themeGet, space } from 'styled-system';
import { px2rem } from '../../config/utils';

export const Divider = Base('hr')`
  border: solid 1px ${themeGet('colors.chrome080')};
  margin-bottom: ${px2rem(16)};
  margin-top: ${px2rem(16)};
  width: 100%;
  ${space}
`;
