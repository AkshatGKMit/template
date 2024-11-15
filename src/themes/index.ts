import { colorWithOpacity } from '@utility/helpers';

import { Colors } from './colors';
import { FontFamily, FontSize, FontWeight } from './font';

const lightTheme = {
  accent: Colors.accent.light,
  accentText: Colors.greyShades.shade600,
  defaultIcon: Colors.black,
  divider: colorWithOpacity(Colors.black, 0.2),
  placeholder: Colors.greyShades.shade400,
  primary: Colors.primary.light,
  primaryText: Colors.primary.light,
  primaryBackground: Colors.white,
  secondaryBackground: Colors.greyShades.shade200,
  screenGradient: [Colors.greyShades.shade100, colorWithOpacity(Colors.greyShades.shade100, 0.3)],
  statusBar: Colors.primary.light,
  text: Colors.black,
  secondaryText: Colors.greyShades.shade600,
  underlay: colorWithOpacity(Colors.greyShades.shade800, 0.25),
};

const darkTheme = {
  accent: Colors.accent.dark,
  accentText: Colors.greyShades.shade400,
  defaultIcon: Colors.white,
  divider: colorWithOpacity(Colors.white, 0.2),
  placeholder: Colors.greyShades.shade600,
  primary: Colors.primary.dark,
  primaryText: Colors.primary.dark,
  primaryBackground: Colors.black,
  secondaryBackground: Colors.greyShades.shade800,
  screenGradient: [Colors.greyShades.shade900, colorWithOpacity(Colors.greyShades.shade900, 0.3)],
  statusBar: Colors.primary.dark,
  text: Colors.white,
  secondaryText: Colors.greyShades.shade400,
  underlay: colorWithOpacity(Colors.greyShades.shade200, 0.25),
};

export const ThemeColorModes: ThemeColorModes = {
  light: {
    ...lightTheme,
    inverted: darkTheme,
  },
  dark: {
    ...darkTheme,
    inverted: lightTheme,
  },
};

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
} as const;

export const Orientation = {
  portrait: 'portrait',
  landscape: 'landscape',
} as const;

export { FontFamily, FontSize, FontWeight, Colors };
