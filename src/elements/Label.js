import { themeGet } from 'styled-system';

import { Base } from '../primitives/Base';

export const Label = Base('label')`
  color: ${themeGet('colors.chrome040')};
  font-size: ${themeGet('fontSizes.sm')};
  font-weight: ${themeGet('fontWeights.bold')};
  text-transform: capitalize;
`;
