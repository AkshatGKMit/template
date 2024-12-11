import { colorWithOpacity } from '@utility/helpers';

import { Colors, Dark, Light, Palettes } from './colors';
import { FontFamily, Typography, FontWeight, Elevation } from './font';

const lightTheme: InvertedOmittedThemeColors = {
  main: Colors.white,
  primary: Light.primary,
  primaryText: Light.primary,
  primaryBackground: Light.surface,
  secondaryBackground: Light.surfaceContainer,
  cardColor: Light.surfaceContainer,
  screenGradient: [Light.surfaceContainerHighest, Light.surfaceContainerLowest],
  text: Light.onSurface,
  secondaryText: Light.onSurface,
  error: Light.error,
  divider: Light.outlineVariant,
  placeholder: Light.outline,
  statusBarColor: Light.surface,
  appBar: {
    background: Light.surface,
    foreground: Light.onSurface,
  },
  underlay: (opacity?: number) => colorWithOpacity(Light.outlineVariant, opacity ?? 0.25),
  all: Light,
} as const;

const darkTheme: InvertedOmittedThemeColors = {
  main: Colors.black,
  primary: Dark.primary,
  primaryText: Dark.primary,
  primaryBackground: Dark.surface,
  secondaryBackground: Dark.surfaceContainer,
  cardColor: Dark.surfaceContainer,
  screenGradient: [Dark.surfaceContainerHighest, Dark.surfaceContainerLowest],
  text: Dark.onSurface,
  secondaryText: Dark.onSurface,
  error: Dark.error,
  divider: Dark.outlineVariant,
  placeholder: Dark.outline,
  statusBarColor: Dark.surface,
  appBar: {
    background: Dark.surface,
    foreground: Dark.onSurface,
  },
  underlay: (opacity?: number) => colorWithOpacity(Dark.outlineVariant, opacity ?? 0.25),
  all: Dark,
} as const;

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

export { FontFamily, Typography, FontWeight, Colors, Elevation };
