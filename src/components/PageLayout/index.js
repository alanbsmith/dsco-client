import React from 'react';
import styled from '@emotion/styled';
import { themeGet } from 'styled-system';

import { Box } from '../../elements/Box';
import { ResponsiveLayout } from '../../elements/ResponsiveLayout';
import { px2rem } from '../../config/utils';

// import logo from './logo.svg';
import logo2 from './logo2.svg';

const StyledHeader = styled(Box)`
  background-color: ${themeGet('colors.chrome092')};
  background-position: 50% 40%;
  background-repeat: no-repeat;
  background-image: url(${logo2});
  margin-top: ${px2rem(40)};
  min-height: ${px2rem(192)};
  padding: ${px2rem(16)};
`;

StyledHeader.defaultProps = {
  as: 'header',
};

export const Header = ({ children, ...props }) => (
  <StyledHeader {...props}>
    <ResponsiveLayout display="flex" flexDirection="column" justifyContent="flex-end">{children}</ResponsiveLayout>
  </StyledHeader>
);

const StyledMain = styled(Box)`
  flex: 1;
  padding: ${px2rem(32)} ${px2rem(16)};
`;

StyledMain.defaultProps = {
  as: 'main',
  bg: 'chrome098',
};

export const Main = ({ children, ...props }) => (
  <StyledMain {...props}>
    <ResponsiveLayout>{children}</ResponsiveLayout>
  </StyledMain>
);

export const Footer = styled(Box)`
  padding: ${px2rem(16)};
  flex-direction: column;
  min-height: ${px2rem(64)};
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
