import { css } from '@emotion/core';
import theme from './theme';

const globalStyles = css`
  html, body, #root {
    min-height: 100vh;
  }

  body {
    color: ${theme.colors.text};
    font-family: Helvetica;
    font-size: ${theme.baseFontSize};
    margin: 0;
  }

  input, button {
    font-family: Helvetica;
  }

  a {
    text-decoration: none;
    &:hover, &:focus {
      text-decoration: underline;
    }
  }

  button {
    border: none;
    background: none;
  }

  ul {
    list-style: none;
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  * {
    box-sizing: border-box;
  }

  input {
    width: 100%;
  }

  h1,h2,h3,h4,h5,h6,p {
    line-height: 1.25em;
    margin: 0;
  }

  h1 { font-size: ${theme.fontSizes.h1}; }
  h2 { font-size: ${theme.fontSizes.h2}; }
  h3 { font-size: ${theme.fontSizes.h3}; }
  h4 { font-size: ${theme.fontSizes.h4}; }



`;

export default globalStyles;
