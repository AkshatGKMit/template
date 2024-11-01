import { ReactNode } from 'react';

declare global {
  interface CtxProviderProps {
    children?: ReactNode;
  }

  type Orientation = 'portrait' | 'landscape';
  interface WindowDimensions {
    height: number;
    width: number;
  }

  interface ConfigCtxValues {
    theme: ThemeColors;
    isDark: boolean;
    changeTheme: (themeMode: ThemeMode) => void;
    orientation: Orientation;
    dimensions: WindowDimensions;
  }

  type StorageKey = '';

  interface StorageCtxValues {}
}
