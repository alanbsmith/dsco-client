import { Base } from '../../primitives/Base';
import { themeGet, variant } from 'styled-system';
import { TYPOGRAPHY } from '../../primitives/constants';
import { px2rem } from '../../config/utils';

const linkVariants = variant({
  key: 'links',
});

// a button styled like a link
export const ButtonLink = Base('button')`
  background-color: none;
  padding: 0;
  font-size: ${px2rem(16)};
  color: ${themeGet('colors.link')};
  line-height: 1.25em;
  transition: color 0.3s ease;

  &:hover, &:focus {
    color: ${themeGet('colors.linkFocus')};
  }
  ${TYPOGRAPHY}
  ${linkVariants}
`;
