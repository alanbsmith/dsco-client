import styled from '@emotion/styled';
import { themeGet, variant } from 'styled-system';

import { Box } from '../../elements/Box';
import { px2rem } from '../../config/utils';

import { AlertBannerButton } from './AlertBannerButton';

const alertVariants = variant({
  key: 'alerts',
});

export const AlertBanner = styled(Box)`
  padding: ${px2rem(8)};
  font-size: ${themeGet('fontSizes.md')};
  justify-content: space-between;

  ${alertVariants}
`;

AlertBanner.Button = AlertBannerButton;
