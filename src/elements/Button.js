import { themeGet, variant } from 'styled-system';

import { Base } from '../primitives/Base';
import { px2rem } from '../config/utils';

const buttonVariants = variant({
  key: 'buttons',
});

export const Button = Base('button')`
  background: ${themeGet('colors.chrome092')};
  border-radius: ${themeGet('borderRadius')};
  color: ${themeGet('colors.text')};
  cursor: pointer;
  font-size: ${themeGet('fontSizes.md')};
  padding: ${px2rem(8)} ${px2rem(24)};
  text-decoration: none;
  text-transform: capitalize;
  transition: background 0.3s ease;

  ${buttonVariants}
`;
