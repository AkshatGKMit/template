import { colorWithOpacity } from '@utility/helpers';

import { Colors } from './colors';
import { FontFamily, FontSize, FontWeight } from './font';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const lightTheme: InvertedOmittedThemeColors = {
  main: Colors.white,
  accent: Colors.accent.light,
  accentText: Colors.greyShades.shade600,
  defaultIcon: Colors.black,
  divider: (opacity) => colorWithOpacity(Colors.black, opacity ?? 0.2),
  placeholder: (opacity) => colorWithOpacity(Colors.black, opacity ?? 0.45),
  primary: Colors.primary.light,
  primaryText: Colors.primary.light,
  primaryBackground: Colors.white,
  secondaryBackground: Colors.greyShades.shade200,
  screenGradient: [Colors.greyShades.shade100, colorWithOpacity(Colors.greyShades.shade100, 0.3)],
  statusBar: Colors.primary.light,
  text: Colors.black,
  secondaryText: Colors.greyShades.shade600,
  underlay: (opacity) => colorWithOpacity(Colors.greyShades.shade800, opacity ?? 0.25),
  error: Colors.error.light,
};

const darkTheme: InvertedOmittedThemeColors = {
  main: Colors.black,
  accent: Colors.accent.dark,
  accentText: Colors.greyShades.shade400,
  defaultIcon: Colors.white,
  divider: (opacity) => colorWithOpacity(Colors.white, opacity ?? 0.2),
  placeholder: (opacity) => colorWithOpacity(Colors.white, opacity ?? 0.45),
  primary: Colors.primary.dark,
  primaryText: Colors.primary.dark,
  primaryBackground: Colors.black,
  secondaryBackground: Colors.greyShades.shade800,
  screenGradient: [Colors.greyShades.shade900, colorWithOpacity(Colors.greyShades.shade900, 0.3)],
  statusBar: Colors.primary.dark,
  text: Colors.white,
  secondaryText: Colors.greyShades.shade400,
  underlay: (opacity) => colorWithOpacity(Colors.greyShades.shade200, opacity ?? 0.25),
  error: Colors.error.dark,
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

export const StyleValues = {
  textfieldHeight: 40,
  headerHeight: 50,
};

export { FontFamily, FontSize, FontWeight, Colors };
