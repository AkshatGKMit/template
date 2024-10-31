type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  primaryColor: string;
  accentColor: string;
  statusBarColor: string;
  screenBGColor: string;
  primaryTextColor: string;
  accentTextColor: string;
  defaultIconColor: string;
  dividerColor: string;
  errorColor: string;
  placeholderColor: string;
}

interface ThemeColorModes {
  light: ThemeColors;
  dark: ThemeColors;
}
