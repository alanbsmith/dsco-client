import { Base } from '../primitives/Base';
import { TYPOGRAPHY } from '../primitives/constants';

import { themeGet } from 'styled-system';

export const Heading = Base('h1')`
  color: ${themeGet('colors.chome010')};
  ${TYPOGRAPHY}
`;

Heading.defaultProps = {
  fontWeight: 'bold',
};
