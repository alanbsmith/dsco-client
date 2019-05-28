import styled from '@emotion/styled';

import { Flexbox } from '../Flex';
import { px2rem } from '../../config/utils';

export const ButtonList = styled(Flexbox)`
  justify-content: flex-end;
  margin: ${px2rem(16)} 0;

  *:not(:last-child) {
    margin-right: ${px2rem(16)};
  }
`;
