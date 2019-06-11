import { Link as BaseLink } from 'react-router-dom';
import { themeGet } from 'styled-system';

import { Base } from '../../primitives/Base';
import { TYPOGRAPHY } from '../../primitives/constants';

export const Link = Base(BaseLink)`
  color: ${themeGet('colors.link')};
  line-height: 1.25em;
  transition: color 0.3s ease;

  &:hover, &:focus {
    color: ${themeGet('colors.linkFocus')};
  }
  ${TYPOGRAPHY}
`;
