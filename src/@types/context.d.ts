import { ReactNode } from 'react';

declare global {
  interface CtxProviderProps {
    children?: ReactNode;
  }

  interface ConfigCtxProps {
    theme: ThemeColors;
    isDark: boolean;
    changeTheme: (themeMode: ThemeMode) => void;
  }
}
