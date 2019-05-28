import styled from '@emotion/styled';
import { themeGet } from 'styled-system';

import { Flexbox } from '../../elements/Flex';
import { px2rem } from '../../config/utils';

import logo from './logo.svg';

export const Header = styled(Flexbox)`
  background-color: ${themeGet('colors.chrome092')};

  background-position: 50% 40%;
  background-repeat: no-repeat;
  background-image: url(${logo});
  flex-direction: column;
  margin-top: ${px2rem(56)};
  min-height: ${px2rem(192)};
  padding: ${px2rem(16)};
  justify-content: flex-end;
`;

Header.defaultProps = {
  as: 'header',
};

export const Main = styled(Flexbox)`
  flex: 1;
  flex-direction: column;
  padding: ${px2rem(32)} ${px2rem(16)};
`;

Main.defaultProps = {
  as: 'main',
  bg: 'chrome098',
};

export const Footer = styled(Flexbox)`
  padding: ${px2rem(16)};
  flex-direction: column;
  min-height: ${px2rem(112)};
`;

Footer.defaultProps = {
  as: 'footer',
  bg: 'chrome010',
};

export const PageLayout = {
  Header,
  Main,
  Footer,
};
