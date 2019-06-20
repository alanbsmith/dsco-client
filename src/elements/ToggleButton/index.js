import React from 'react';
import { themeGet } from 'styled-system';

import { Base } from '../../primitives/Base';

export const StyledToggleButton = Base('button')`
  border: none;
  border-radius: 2px;
  background: none;
  position: relative;
  padding: 0;
  display: flex;
`;

export const Off = Base('span')`
  background: ${themeGet('colors.chrome080')};
  border-radius: 0 2px 2px 0;
  height: 24px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

export const On = Base('span')`
  background: ${themeGet('colors.success')};
  border-radius: 2px 0 0 2px;
  height: 24px;
  width: 36px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Toggle = Base('span')`
  background: ${themeGet('colors.chrome092')};
  position: absolute;
  left: ${props => props.on ? '50%' : '0'};
  top: 0;
  bottom: 0;
  width: 50%;
  z-index: 1;
  border-radius: ${props => props.on ? '0 2px 2px 0' : '2px 0 0 2px'};
  transition: left 0.3s ease;
`;


export function ToggleButton({ disabled, on, toggleOn }) {

  return (
    <StyledToggleButton disabled={disabled} onClick={toggleOn}>
      <On>on</On>
      <Off>off</Off>
      <Toggle on={on} />
    </StyledToggleButton>
  );
}