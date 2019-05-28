import { BASE_FONT_SIZE } from './constants';

export function px2rem(px) {
  return `${px / BASE_FONT_SIZE}rem`;
}
