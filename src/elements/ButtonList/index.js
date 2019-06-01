import styled from '@emotion/styled';

import { Box } from '../Box';
import { px2rem } from '../../config/utils';

export const ButtonList = styled(Box)`
  justify-content: flex-end;
  margin: ${px2rem(16)} 0;

  *:not(:last-child) {
    margin-right: ${px2rem(16)};
  }
`;
