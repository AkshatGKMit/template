import React, { createContext, useEffect, useState } from 'react';
import { Dimensions, ScaledSize, useColorScheme } from 'react-native';
import { ThemeColorModes } from '@themes/index';

const { height, width } = Dimensions.get('window');

const defaultValue: ConfigCtxProps = {
  theme: ThemeColorModes.light,
  changeTheme: () => {},
  isDark: false,
  dimensions: { height, width },
  orientation: height > width ? 'portrait' : 'landscape',
};

const ConfigContext = createContext<ConfigCtxProps>(defaultValue);

export const ConfigContextProvider = ({ children }: CtxProviderProps) => {
  const colorScheme = useColorScheme();

  const {
    theme: defaultTheme,
    isDark: defaultIsDark,
    dimensions: defaultDimensions,
    orientation: defaultOrientation,
  } = defaultValue;

  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
  const [isDark, setIsDark] = useState<boolean>(defaultIsDark);
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
    if (colorScheme) {
      setTheme(ThemeColorModes[colorScheme]);
      setIsDark(colorScheme === 'dark');
    }
  }, [colorScheme]);

  const changeTheme = (themeMode: ThemeMode) => {
    setTheme(ThemeColorModes[themeMode]);
    setIsDark(themeMode === 'dark');
  };

  const ctxValues = { theme, changeTheme, isDark, dimensions, orientation };

  return (
    <ConfigContext.Provider
      value={ctxValues}
      children={children}
    />
  );
};

export default ConfigContext;
