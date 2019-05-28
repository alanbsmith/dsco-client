import {
  alignContent,
  alignItems,
  alignSelf,
  border,
  borderColor,
  borderRadius,
  bottom,
  color,
  compose,
  display,
  flex,
  flexBasis,
  flexDirection,
  flexWrap,
  fontSize,
  fontStyle,
  fontWeight,
  height,
  justifyContent,
  justifyItems,
  justifySelf,
  left,
  letterSpacing,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  order,
  position,
  right,
  space,
  style,
  textAlign,
  textColor,
  top,
  zIndex,
} from 'styled-system';

const textDecoration = style({
  prop: 'textDecoration',
  cssProperty: 'textDecoration',
});

const textTransform = style({
  prop: 'textTransform',
  cssProperty: 'textTransform',
});

export const BORDER = compose(border, borderColor, borderRadius);

export const LAYOUT = compose(color, display, height, maxHeight, maxWidth, minHeight, minWidth, position, space);

export const POSITION = compose(bottom, left, position, right, top, zIndex);

export const TYPOGRAPHY = compose(
  display,
  fontSize,
  fontStyle,
  fontWeight,
  letterSpacing,
  textAlign,
  textColor,
  textDecoration,
  textTransform,
  LAYOUT
);

export const FLEX = compose(
  alignContent,
  alignItems,
  flex,
  flexBasis,
  flexDirection,
  flexWrap,
  justifyContent,
  justifyItems,
  order,
  alignSelf,
  justifySelf,
  LAYOUT,
  POSITION,
  BORDER
);
