import { themeGet, variant } from 'styled-system';
import { css } from '@emotion/core';
import { Base } from '../primitives/Base';
import { px2rem } from '../config/utils';

const buttonVariants = variant({
  key: 'buttons',
});

function size(props) {
  switch (props.size) {
    case 'small':
      return (props) => css`
        font-size: ${props.theme.fontSizes.sm};
        padding: ${px2rem(8)} ${px2rem(12)};
      `;
    default:
      return (props) => css`
        font-size: ${props.theme.fontSizes.md};
        padding: ${px2rem(8)} ${px2rem(24)};
      `;
  }
}

export const Button = Base('button')`
  background: ${themeGet('colors.chrome092')};
  border-radius: ${themeGet('borderRadius')};
  color: ${themeGet('colors.text')};
  cursor: pointer;
  text-decoration: none;
  text-transform: capitalize;
  transition: background 0.3s ease;
  ${size}
  ${buttonVariants}
`;
