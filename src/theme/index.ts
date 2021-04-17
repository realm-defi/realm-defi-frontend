import { baseColors, black, purple, teal, grey, red, white } from './colors';
import { breakpoints, mediaQueries } from './mediaQueries';
import { MediaQueries, Breakpoints } from './types';

export interface RealmTheme {
  borderRadius: number;
  color: any;
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
    primary: {
      light: red[200],
      main: baseColors.primary,
    },
    secondary: {
      main: teal[200],
    },
    white,
    teal,
    priceColors: {
      primary: baseColors.pricePrimary,
      secondary: baseColors.priceSecondary,
      tertiary: baseColors.priceTertiary,
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
