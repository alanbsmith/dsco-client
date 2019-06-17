import styled from '@emotion/styled';

import { Box } from '../../elements/Box';
import { px2rem } from '../../config/utils';

export const ResponsiveLayout = styled(Box)`
  flex: 1;
  flex-direction: column;

  @media (min-width: 700px) {
    max-width: ${px2rem(640)};
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: 1000px) {
    max-width: ${px2rem(960)};
    margin-left: auto;
    margin-right: auto;
  }
`;
