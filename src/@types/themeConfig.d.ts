import { Orientation, ThemeMode, FontFamily } from '@themes';

declare global {
  interface WindowDimensions {
    height: number;
    width: number;
  }

  type Orientation = (typeof Orientation)[keyof typeof Orientation];

  type SafeAreaInsets = {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

  interface ThemeColors {
    main: string;
    primary: string;
    primaryText: string;
    primaryBackground: string;
    secondaryBackground: string;
    cardColor: string;
    screenGradient: string[];
    text: string;
    secondaryText: string;
    error: string;
    divider: string;
    placeholder: string;
    underlay: string;
    all: Object;
    inverted: InvertedOmittedThemeColors;
  }

  type InvertedOmittedThemeColors = Omit<ThemeColors, 'inverted'>;

  interface ThemeColorModes {
    light: ThemeColors;
    dark: ThemeColors;
  }

  type FontFamily = (typeof FontFamily)[keyof typeof FontFamily];

  interface ThemeConfig {
    colors: ThemeColors;
    isDark: boolean;
    fontFamily: FontFamily;
  }
}
