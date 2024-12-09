import {
  Orientation,
  ThemeMode,
  FontFamily,
  FontWeight,
  Elevation,
  Typography,
  Elevation,
} from '@themes';

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

  interface Colors {
    primary: string;
    surfaceTint: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    shadow: string;
    scrim: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    primaryFixed: string;
    onPrimaryFixed: string;
    primaryFixedDim: string;
    onPrimaryFixedVariant: string;
    secondaryFixed: string;
    onSecondaryFixed: string;
    secondaryFixedDim: string;
    onSecondaryFixedVariant: string;
    tertiaryFixed: string;
    onTertiaryFixed: string;
    tertiaryFixedDim: string;
    onTertiaryFixedVariant: string;
    surfaceDim: string;
    surfaceBright: string;
    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
  }

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
    statusBarColor: string;
    appBarColor: string;
    underlay: (opacity?: number) => string;
    all: Colors;
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
