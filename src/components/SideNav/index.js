import React from 'react';
import { Link } from 'react-router-dom';
import { themeGet } from 'styled-system';

import { Flexbox } from '../../elements/Flex';
import { Text } from '../../elements/Text';
import { Base } from '../../primitives/Base';
import { px2rem } from '../../config/utils';

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
  z-index: 2;
  transition: left 0.3s ease;
  &.open {
    left: 0;
  }
`;

const Header = Base(Flexbox)`
  background: ${themeGet('colors.chrome020')};
  flex-direction: column;
  min-height: ${px2rem(192)};
  padding: ${px2rem(16)};
  justify-content: flex-end;
  position: relative;
`;

const Body = Base(Flexbox)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = Base(Flexbox)`
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

  &.visible {
    display: block;
    opacity: 0.9;
  }
`;

export const SideNav = ({ handleClose, isOpen }) => {
  return (
    <>
    <SideDrawerMask className={isOpen ? 'visible' : ''} onClick={handleClose} />
    <SideDrawer className={isOpen ? 'open' : ''}>
      <Header>
        <ToggleButton hidden={!isOpen} handleClick={handleClose} />
      <h1 style={{ color: '#fff'}}>Design Systems</h1>
      <Text color="chrome080" textTransform="uppercase" letterSpacing="2px" fontSize="sm">colorado</Text>
      </Header>
      <Body>
        <NavList>
          <NavListItem><NavLink onClick={handleClose} to="/">home</NavLink></NavListItem>
          <NavListItem><NavLink onClick={handleClose} to="/events">events</NavLink></NavListItem>
        </NavList>
      </Body>
      <Footer>
      <NavLink onClick={handleClose} to="/login">login</NavLink>
      </Footer>
    </SideDrawer>
    </>
  )
}

SideNav.defaultProps = {
  isOpen: false,
}

const ToggleButton = (props) => {
  if (props.hidden) {
    return null;
  }
  return <MenuToggleButton autoFocus onClick={props.handleClick}>𝌆</MenuToggleButton>
}

ToggleButton.defaultProps = {
  hidden: true,
}
