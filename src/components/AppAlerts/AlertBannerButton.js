import { themeGet } from 'styled-system';

import { Base } from '../../primitives/Base';
import { px2rem } from '../../config/utils';

export const AlertBannerButton = Base('button')`
  background: none;
  border: none;
  font-size: ${themeGet('fontSizes.xs')};
  padding: ${px2rem(8)};
`;
