import { Base } from '../../primitives/Base';
import { px2rem } from '../../config/utils';

export const Alerts = Base()`
  position: fixed;
  top: ${px2rem(40)};
  left: 0;
  right: 0;
`;
