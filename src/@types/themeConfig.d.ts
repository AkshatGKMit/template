import { Orientation, ThemeMode } from '@constants';

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
    underlay: string;
    divider: string;
    placeholder: string;
    inverted: Omit<ThemeColors, 'inverted'>;
  }

  interface ThemeColorModes {
    light: ThemeColors;
    dark: ThemeColors;
  }

  type Font = (typeof Font)[keyof typeof Font];

  interface ThemeConfig {
    colors: ThemeColors;
    isDark: boolean;
    font: Font;
  }
}
