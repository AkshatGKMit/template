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
    accent: string;
    statusBar: string;
    primaryBackground: string;
    secondaryBackground: string;
    screenGradient: string[];
    text: string;
    primaryText: string;
    secondaryText: string;
    accentText: string;
    defaultIcon: string;
    divider: (opacity?: number) => string;
    underlay: (opacity?: number) => string;
    placeholder: (opacity?: number) => string;
    error: string;
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
