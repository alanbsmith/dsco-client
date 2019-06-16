import { Base } from '../../primitives/Base';
import { px2rem } from '../../config/utils';

export const ResponsiveLayout = Base()`
  @media (min-width: 700px) {
    min-width: ${px2rem(640)};
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: 1000px) {
    min-width: ${px2rem(960)};
    margin-left: auto;
    margin-right: auto;
  }
`;
