import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, ScaledSize, useColorScheme } from 'react-native';
import StorageContext from './StorageContext';
import { ThemeColorModes } from '@themes/index';

const { height, width } = Dimensions.get('window');

const defaultValue: ConfigCtxValues = {
  theme: ThemeColorModes.light,
  switchTheme: () => {},
  isDark: false,
  dimensions: { height, width },
  orientation: height > width ? 'portrait' : 'landscape',
};

const ConfigContext = createContext<ConfigCtxValues>(defaultValue);

export const ConfigContextProvider = ({ children }: CtxProviderProps) => {
  const { dimensions: defaultDimensions, orientation: defaultOrientation } = defaultValue;

  const { darkTheme, changeTheme } = useContext(StorageContext);

  const [theme, setTheme] = useState<ThemeColors>(
    darkTheme ? ThemeColorModes.dark : ThemeColorModes.light,
  );
  const [isDark, setIsDark] = useState<boolean>(darkTheme);
  const [dimensions, setDimensions] = useState(defaultDimensions);
  const [orientation, setOrientation] = useState(defaultOrientation);

  const _onDimensionChange = ({ window }: { window: ScaledSize }) => {
    setDimensions({
      height: window.height,
      width: window.width,
    });
    setOrientation(window.height > window.width ? 'portrait' : 'landscape');
  };

  useEffect(() => {
    const dimensionsEvent = Dimensions.addEventListener('change', _onDimensionChange);

    _onDimensionChange({ window: Dimensions.get('window') });

    return () => {
      dimensionsEvent.remove();
    };
  }, []);

  useEffect(() => {
    setTheme(ThemeColorModes[darkTheme ? 'dark' : 'light']);
    setIsDark(darkTheme);
  }, [darkTheme]);

  const switchTheme = (themeMode: ThemeMode) => {
    setTheme(ThemeColorModes[themeMode]);
    setIsDark(themeMode === 'dark');
    changeTheme(themeMode === 'dark');
  };

  const ctxValues: ConfigCtxValues = { theme, switchTheme, isDark, dimensions, orientation };

  return (
    <ConfigContext.Provider
      value={ctxValues}
      children={children}
    />
  );
};

export default ConfigContext;
