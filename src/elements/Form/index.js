import { Base } from '../../primitives/Base';
import { px2rem } from '../../config/utils';

export const Form = Base('form')`
  display: flex;
  flex-direction: column;
  max-width: ${px2rem(400)};

  @media (min-width: 700px) {
    max-width: ${px2rem(640)};
  }
`;
