import { ReactNode } from 'react';

declare global {
  interface ContextProviderProps {
    children?: ReactNode;
  }

  interface ThemeContextValues {
    theme: ThemeConfig;
    switchThemeMode: (themeMode: ThemeMode) => void;
    changeFont: (font: Font) => void;
    orientation: Orientation;
    dimensions: WindowDimensions;
    safeAreaInsets: SafeAreaInsets;
  }
}
