import React, { useState } from 'react';
import styled from '@emotion/styled';
import { themeGet } from 'styled-system';
import { Link } from 'react-router-dom';

import { Box } from '../../elements/Box';

import { SideNav } from '../SideNav';

import { useCurrentUser } from '../../providers/CurrentUser';

import { px2rem } from '../../config/utils';

export const Navbar = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  left: 0;
  min-height: ${px2rem(40)};
  padding: ${px2rem(4)}; ${px2rem(8)};
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
`;

Navbar.defaultProps = {
  as: 'nav',
  bg: 'chrome010',
};

const NavLink = styled(Link)`
  color: ${themeGet('colors.chrome100')};
  padding: ${px2rem(8)};
  text-decoration: none;
  &:hover, &:focus {
    text-decoration: underline;
  }
`;

const BrandLink = styled(NavLink)`
  letter-spacing: ${px2rem(4)};
  font-size: ${themeGet('fontSizes.h4')}
`;

const MenuToggleButton = styled.button`
  color: ${themeGet('colors.chrome080')};
  cursor: pointer;
  font-size: ${themeGet('fontSizes.md')};
  padding: ${px2rem(8)};
`;

MenuToggleButton.defaultProps = {
  color: 'chrome092',
};

export const TopNav = () => {
  const { currentUser } = useCurrentUser();
  const [isLeftNavOpen, setLeftNavOpen] = useState(false);

  return (
    <Navbar>
      <Box alignItems="center">
        <MenuToggleButton aria-label="toggle side nav menu" aria-pressed={isLeftNavOpen} onClick={() => setLeftNavOpen(!isLeftNavOpen)}>𝌆</MenuToggleButton>
        <BrandLink to="/">DSCO</BrandLink>
      </Box>
      {currentUser &&
        <NavLink to="/account">
          Hi, {currentUser.firstName}!
        </NavLink>}
      <SideNav isOpen={isLeftNavOpen} handleClose={() => setLeftNavOpen(false)} />
    </Navbar>
  );
};
