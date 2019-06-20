import styled from '@emotion/styled';
import { themeGet, variant } from 'styled-system';

import { Box } from '../Box';


const badgeVariants = variant({
  key: 'badges',
});

export const Badge = styled(Box)`
  display: inline-block;
  text-transform: uppercase;
  font-size: ${themeGet('fontSizes.xs')};
  letter-spacing: 1px;
  background: ${themeGet('colors.chrome092')};
  border-radius: 2px;
  padding: 2px 4px;
  ${badgeVariants}
`;
