import React from 'react';
// import { Link } from 'react-router-dom';
import { themeGet } from 'styled-system';

// import { Formik, Form as FormikForm } from 'formik';
// import * as yup from 'yup';
// components
// import { ValidatedTextField } from '../../components/ValidatedTextField';
// elements
// import { Button } from '../../elements/Button';
// import { ButtonList } from '../../elements/ButtonList';
// import { Form } from '../../elements/Form';

import { Box } from '../../elements/Box';
// import { Text } from '../../elements/Text';
import { Base } from '../../primitives/Base';
import { px2rem } from '../../config/utils';

// providers
// import { useCurrentUser } from '../../providers/CurrentUser';
// import { TextField } from '../../elements/TextField';
import { Heading } from '../../elements/Heading';

export const SideDrawer = Base('nav')`
  background: ${themeGet('colors.chrome098')};
  bottom: 0;
  color: ${themeGet('colors.chrome020')};
  display: flex;
  flex-direction: column;
  right: -${px2rem(320)};
  width: ${px2rem(320)};
  position: fixed;
  top: 0;
  z-index: 2;
  transition: right 0.3s ease;
  &.open {
    right: 0;
  }
`;

const Header = Base(Box)`
  background: ${themeGet('colors.chrome010')};
  flex-direction: column;
  min-height: ${px2rem(24)};
  padding: ${px2rem(16)};
  justify-content: flex-end;
  position: relative;
`;

const Body = Base(Box)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: ${px2rem(16)};
`;

const MenuToggleButton = Base('button')`
  position: absolute;
  top: ${px2rem(16)};
  left: ${px2rem(16)};
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
  z-index: 1;

  &.visible {
    display: block;
    opacity: 0.9;
  }
`;


export const RightDrawer = ({ handleClose, isOpen, children, title }) => {
  return (
    <>
      <SideDrawerMask className={isOpen ? 'visible' : ''} onClick={handleClose} />
      <SideDrawer className={isOpen ? 'open' : ''}>
        {isOpen && (
          <>
            <Header>
              <MenuToggleButton autoFocus aria-label="close side nav menu" aria-pressed={!isOpen} onClick={handleClose}>𝌆</MenuToggleButton>
              <Heading textAlign="right" fontWeight="400" as="h2" color="white">{title}</Heading>
            </Header>
            <Body>
              {children}
            </Body>
          </>
        )}
      </SideDrawer>
    </>
  )
}
