import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeColorModes } from '@themes/index';

const defaultValue: ConfigCtxProps = {
  theme: ThemeColorModes.light,
  changeTheme: () => {},
  isDark: false,
};

const ConfigContext = createContext<ConfigCtxProps>(defaultValue);

export const ConfigContextProvider = ({ children }: CtxProviderProps) => {
  const colorScheme = useColorScheme();

  const { theme: defaultTheme, isDark: defaultIsDark } = defaultValue;

  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
  const [isDark, setIsDark] = useState<boolean>(defaultIsDark);

  useEffect(() => {
    if (colorScheme) {
      setTheme(ThemeColorModes[colorScheme]);
      setIsDark(colorScheme === 'dark');
    }
  }, [colorScheme]);

  const changeTheme = (themeMode: ThemeMode) => {
    setTheme(ThemeColorModes[themeMode]);
    setIsDark(themeMode === 'dark');
  };

  const ctxValues = { theme, changeTheme, isDark };

  return (
    <ConfigContext.Provider
      value={ctxValues}
      children={children}
    />
  );
};

export default ConfigContext;
