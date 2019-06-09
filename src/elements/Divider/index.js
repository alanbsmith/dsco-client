import { Base } from '../../primitives/Base';

import { themeGet } from 'styled-system';
import { px2rem } from '../../config/utils';

export const Divider = Base('hr')`
  border: solid 1px ${themeGet('colors.chrome080')};
  margin: ${px2rem(16)} 0;
  width: 100%;
`;
