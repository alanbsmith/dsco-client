import { themeGet, variant } from 'styled-system';

import { Base } from '../../primitives/Base';
import { px2rem } from '../../config/utils';

import { FieldErrorMessage } from '../FieldErrorMessage';

const selectVariants = variant({
  key: 'textFields',
});

export const Select = Base('select')`
  background: ${themeGet('colors.chrome092')};
  border-radius: ${themeGet('borderRadius')};
  border: none;
  font-size: ${themeGet('fontSizes.md')};
  margin: ${px2rem(8)} 0 ${px2rem(24)};
  padding: ${px2rem(8)};
  transition: background 0.3s;

  ${selectVariants}
`;

Select.ErrorMessage = FieldErrorMessage;
