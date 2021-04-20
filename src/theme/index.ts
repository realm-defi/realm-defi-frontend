import { baseColors, black, purple, teal, grey, red, white, green } from './colors';
import { breakpoints, mediaQueries } from './mediaQueries';
import { MediaQueries, Breakpoints, PriceColors } from './types';

interface Color {
  bg?: string
  black: string
  white: string
  purple: Record<string, string>
  teal: Record<string, string>
  grey: Record<string, string>
  red?: Record<string, string>
  green?: string
  primary: {
    light: string
    main: string
  }
  secondary: {
    main: string
  }
  priceColors: PriceColors
}
export interface RealmTheme {
  borderRadius: number;
  color: Color;
  siteWidth: number;
  spacing: Record<number, number>;
  topBarSize: number;
  card: { background: string };
  mediaQueries: MediaQueries;
  breakpoints: Breakpoints;
}

const theme: RealmTheme = {
  borderRadius: 12,
  color: {
    black,
    grey,
    purple,
    green: green[500],
    red,
    primary: {
      light: red[200],
      main: baseColors.primaryText,
    },
    secondary: {
      main: teal[200],
    },
    white,
    teal,
    priceColors: {
      primary: baseColors.primary,
      secondary: baseColors.secondary,
      tertiary: baseColors.tertiary,
    },
  },
  siteWidth: 1200,
  spacing: {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
  },
  topBarSize: 72,
  card: {
    background: baseColors.cardBackground,
  },
  mediaQueries,
  breakpoints,
};

export default theme;
