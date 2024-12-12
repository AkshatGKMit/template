import ColorType from '@constants/colorType';
import {
  Orientation,
  ThemeMode,
  FontFamily,
  FontWeight,
  Elevation,
  Typography,
  Elevation,
} from '@themes';
import { Light } from '@themes/colors';

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

  type ColorTheme = {
    [key in keyof typeof ColorType]: string;
  };

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
    statusBarColor: string;
    appBar: {
      background: string;
      foreground: string;
    };
    underlay: (opacity?: number) => string;
    all: ColorTheme;
    inverted: InvertedOmittedThemeColors;
  }

  type InvertedOmittedThemeColors = Omit<ThemeColors, 'inverted'>;

  interface ThemeColorModes {
    light: ThemeColors;
    dark: ThemeColors;
  }

  type FontFamilyNormal = (typeof FontFamily.normal)[keyof typeof FontFamily.normal];
  type FontFamilyItalic = (typeof FontFamily.italic)[keyof typeof FontFamily.italic];

  type FontFamily = FontFamilyNormal | FontFamilyItalic;
  type Typography = (typeof Typography)[keyof typeof Typography];
  type FontWeight = (typeof FontWeight)[keyof typeof FontWeight];
  type Elevation = (typeof Elevation)[keyof typeof Elevation];

  interface ThemeConfig {
    colors: ThemeColors;
    isDark: boolean;
    fontFamily: FontFamily;
  }
}
