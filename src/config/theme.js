import { BASE_FONT_SIZE } from './constants';
import { px2rem } from './utils';

// common colors
const chrome020 = 'hsl(198, 10%, 20%)';
const chrome040 = 'hsl(198, 10%, 40%)';
const chrome092 = 'hsl(198, 10%, 92%)';
const white = 'hsl(198, 0%, 100%)';

// related hues
const violet = 'hsl(288, 100%, 45%)';

const secondary = 'hsl(198, 100%, 25%)';

const danger = 'hsl(348, 100%, 45%)';
const dangerDark = 'hsl(348, 100%, 15%)';
const dangerLight = 'hsl(348, 100%, 75%)';
const dangerLighter = 'hsl(348, 100%, 85%)';
const info = 'hsl(198, 100%, 45%)';
const infoDark = 'hsl(198, 100%, 15%)';
const infoLight = 'hsl(198, 100%, 75%)';
const success = 'hsl(168, 100%, 45%)';
const successDark = 'hsl(168, 100%, 15%)';
const successLight = 'hsl(168, 100%, 75%)';
const warning = 'hsl(48, 100%, 50%)';
const warningDark = 'hsl(48, 100%, 15%)';
const warningLight = 'hsl(48, 100%, 75%)';

const theme = {
  // dimensions
  borderRadius: '2px',
  // fonts
  baseFontSize: `${BASE_FONT_SIZE}px`,
  fontSizes: {
    xs: px2rem(12),
    sm: px2rem(14),
    md: px2rem(16),
    lg: px2rem(18),
    xl: px2rem(20),
    h3: px2rem(14),
    h2: px2rem(20),
    h1: px2rem(32),
  },
  fontWeights: {
    normal: 400,
    bold: 600,
  },
  colors: {
    // grayscale
    chrome010: 'hsl(198, 10%, 10%)',
    chrome020,
    chrome040,
    chrome080: 'hsl(198, 10%, 80%)',
    chrome092,
    chrome098: 'hsl(198, 10%, 98%)',
    chrome100: white,
    // ui colors
    primary: success,
    secondary,
    text: chrome020,
    link: secondary,
    linkFocus: info,
    // status colors
    success,
    successDark,
    successLight,

    info,
    infoDark,
    infoLight,

    warning,
    warningDark,
    warningLight,

    danger,
    dangerDark,
    dangerLight,
  },
  // variants
  buttons: {
    disabled: {
      cursor: 'initial',
      background: chrome092,
      color: chrome040,
    },
    primary: {
      background: success,
      color: successDark,
      '&:hover, &:focus': {
        background: successLight,
      },
    },
    ghost: {
      background: 'transparent',
      color: chrome040,
      '&:hover, &:focus': {
        background: chrome092,
        color: chrome020,
      },
    },
    ghostDanger: {
      background: 'transparent',
      color: chrome040,
      '&:hover, &:focus': {
        background: dangerLight,
        color: chrome020,
      },
    },
    success: {
      background: success,
      color: successDark,
      '&:hover, &:focus': {
        background: successLight,
      },
    },
    info: {
      background: info,
      color: infoDark,
      '&:hover, &:focus': {
        background: infoLight,
      },
    },
    warning: {
      background: warning,
      color: warningDark,
      '&:hover, &:focus': {
        background: warningLight,
      },
    },
    danger: {
      background: dangerLight,
      color: dangerDark,
      '&:hover, &:focus': {
        background: dangerLighter,
      },
    },
  },
  textFields: {
    danger: {
      background: dangerLight,
      color: dangerDark,
    }
  },
  alerts: {
    success: {
      background: successLight,
      color: successDark,
    },
    info: {
      background: infoLight,
      color: infoDark,
    },
    warning: {
      background: warningLight,
      color: warningDark,
    },
    danger: {
      background: dangerLight,
      color: dangerDark,
    }
  },
  links: {
    danger: {
      color: dangerDark,
      '&:hover, &:focus': {
        color: danger,
      },
    }
  },
  badges: {
    verified: {
      background: successLight,
    },
    admin: {
      background: violet,
      color: white,
    }
  }
};

export default theme;
