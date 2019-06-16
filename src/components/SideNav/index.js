import React from 'react';
import { Link } from 'react-router-dom';
import { themeGet } from 'styled-system';

import { Box } from '../../elements/Box';
import { Base } from '../../primitives/Base';
import { px2rem } from '../../config/utils';

import { useCurrentUser } from '../../providers/CurrentUser';
import { Heading } from '../../elements/Heading';

export const SideDrawer = Base('nav')`
  background: ${themeGet('colors.chrome010')};
  bottom: 0;
  color: ${themeGet('colors.chrome100')};
  display: flex;
  flex-direction: column;
  left: -${px2rem(320)};
  width: ${px2rem(320)};
  position: fixed;
  top: 0;
  z-index: 3;
  transition: left 0.3s ease;
  &.open {
    left: 0;
  }
`;

const Header = Base(Box)`
  background: ${themeGet('colors.chrome020')};
  flex-direction: column;
  min-height: ${px2rem(192)};
  padding: ${px2rem(16)};
  justify-content: flex-end;
  position: relative;
`;

const Body = Base(Box)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = Base(Box)`
  border-top: 1px solid ${themeGet('colors.chrome040')};
  display: flex;
  margin: 0 ${px2rem(16)};
  padding: ${px2rem(16)} 0;
`;

const NavList = Base('ul')`
  padding: ${px2rem(8)};
`

const NavListItem = Base('li')`
  padding: ${px2rem(8)};

  a {
    color: ${themeGet('colors.chrome092')};
    text-transform: capitalize;  
  }

  &:hover,
  &:focus {
    a {
      color: ${themeGet('colors.chrome100')};
    }
  }
`;

const NavLink = Base(Link)`
  color: ${themeGet('colors.chrome092')};
  text-transform: capitalize;
  &:hover,
  &:focus {
    color: ${themeGet('colors.chrome100')};
  }
`;

const MenuToggleButton = Base('button')`
  position: absolute;
  top: ${px2rem(16)};
  right: ${px2rem(16)};
  font-size: ${themeGet('fontSizes.md')};
  color: ${themeGet('colors.chrome080')};
`

const SideDrawerMask = Base()`
  background: ${themeGet('colors.chrome010')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 0.3s 0.1s ease-in-out;
  opacity: 0;
  display: none;
  z-index: 2;

  &.visible {
    display: block;
    opacity: 0.9;
  }
`;

export const SideNav = ({ handleClose, isOpen }) => {
  const { logout, currentUser } = useCurrentUser();

  function handleLogout() {
    logout();
    return handleClose();
  }

  return (
    <>
      <SideDrawerMask className={isOpen ? 'visible' : ''} onClick={handleClose} />
      <SideDrawer className={isOpen ? 'open' : ''}>
        {isOpen && (
          <>
            <Header>
              <MenuToggleButton autoFocus aria-label="close side nav menu" aria-pressed={!isOpen} onClick={handleClose}>𝌆</MenuToggleButton>
              <Heading letterSpacing="0.25rem" fontWeight="400" color="white" as="h2">DSCO</Heading>
            </Header>
            <Body>
              <NavList>
                <NavListItem><NavLink onClick={handleClose} to="/">home</NavLink></NavListItem>
                {currentUser
                  ? <NavListItem><NavLink onClick={handleClose} to="/account">your account</NavLink></NavListItem>
                  : (<NavListItem>
                    <NavLink onClick={handleClose} to="/login">login</NavLink>{' '}/{' '}
                    <NavLink onClick={handleClose} to="/signup">signup</NavLink>
                  </NavListItem>)
                }
              </NavList>
            </Body>
            <Footer>
              {currentUser && <NavLink onClick={handleLogout} to="/">logout</NavLink>}
            </Footer>
          </>
        )}
      </SideDrawer>
    </>
  )
}
