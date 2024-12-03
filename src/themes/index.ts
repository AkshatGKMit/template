import { Colors, Dark, Light } from './colors';
import { FontFamily, FontSize, FontWeight } from './font';

const lightTheme: InvertedOmittedThemeColors = {
  main: Colors.white,
  primary: Light.primary.color,
  primaryText: Light.primary.color,
  primaryBackground: Light.neutral.surface.main,
  secondaryBackground: Light.neutral.container.normal,
  cardColor: Light.neutral.container.normal,
  screenGradient: [Light.neutral.container.highest, Light.neutral.container.lowest],
  text: Light.neutral.surface.on,
  secondaryText: Light.neutral.surface.var,
  error: Light.error.color,
  divider: Light.neutral.outline.variant,
  placeholder: Light.neutral.outline.main,
  underlay: Light.neutral.outline.variant,
  all: Light,
};

const darkTheme: InvertedOmittedThemeColors = {
  main: Colors.white,
  primary: Dark.primary.color,
  primaryText: Dark.primary.color,
  primaryBackground: Dark.neutral.surface.main,
  secondaryBackground: Dark.neutral.container.normal,
  cardColor: Dark.neutral.container.normal,
  screenGradient: [Dark.neutral.container.highest, Dark.neutral.container.lowest],
  text: Dark.neutral.surface.on,
  secondaryText: Dark.neutral.surface.var,
  error: Dark.error.color,
  divider: Dark.neutral.outline.variant,
  placeholder: Dark.neutral.outline.main,
  underlay: Dark.neutral.outline.variant,
  all: Dark,
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
