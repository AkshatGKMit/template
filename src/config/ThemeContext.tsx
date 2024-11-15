import { createContext, useEffect, useState } from 'react';
import { Appearance, Dimensions, ScaledSize, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StorageKey } from '@constants';
import { FontFamily, Orientation, ThemeColorModes, ThemeMode } from '@themes';
import { StorageManager } from '@utility/helpers';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const currentColorScheme = Appearance.getColorScheme();

const defaultThemeConfigValue: ThemeConfig = {
  colors: ThemeColorModes[currentColorScheme ?? ThemeMode.light],
  isDark: currentColorScheme === ThemeMode.dark,
  fontFamily: FontFamily.default,
};

const defaultContextValue: ThemeContextValues = {
  theme: defaultThemeConfigValue,
  switchThemeMode: () => {},
  changeFont: () => {},
  dimensions: { height: windowHeight, width: windowWidth },
  orientation: windowHeight > windowWidth ? Orientation.portrait : Orientation.landscape,
  safeAreaInsets: { bottom: 0, left: 0, right: 0, top: 0 },
};

const ThemeContext = createContext<ThemeContextValues>(defaultContextValue);

export const ThemeContextProvider = ({ children }: ContextProviderProps) => {
  const {
    theme: defaultTheme,
    dimensions: defaultDimensions,
    orientation: defaultOrientation,
  } = defaultContextValue;

  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [dimensions, setDimensions] = useState<WindowDimensions>(defaultDimensions);
  const [orientation, setOrientation] = useState<Orientation>(defaultOrientation);

  const changeDimensions = ({ window }: { window: ScaledSize }) => {
    const { height, width } = window;
    setDimensions({
      height,
      width,
    });
    setOrientation(height > width ? Orientation.portrait : Orientation.landscape);
  };

  const switchThemeMode = async (themeMode: ThemeMode) => {
    const newThemeColors: ThemeColors = ThemeColorModes[themeMode];
    setTheme((prevTheme) => ({
      ...prevTheme,
      colors: newThemeColors,
      isDark: themeMode === ThemeMode.dark,
    }));

    await StorageManager.saveStoreValue(StorageKey.themeMode, JSON.stringify(themeMode));
  };

  const changeFont = async (newFont: FontFamily) => {
    setTheme((prevTheme) => ({ ...prevTheme, fontFamily: newFont }));

    await StorageManager.saveStoreValue(StorageKey.fontFamily, JSON.stringify(newFont));
  };

  const loadStore = async () => {
    const storedFont =
      (await StorageManager.getStoreValue<FontFamily>(StorageKey.fontFamily)) ??
      defaultTheme.fontFamily;

    const storedThemeMode =
      (await StorageManager.getStoreValue<ThemeMode>(StorageKey.themeMode)) ??
      colorScheme ??
      ThemeMode.light;

    const colors: ThemeColors = ThemeColorModes[storedThemeMode];
    const isDark = storedThemeMode === ThemeMode.dark;

    setTheme({ colors, isDark, fontFamily: storedFont });
  };

  useEffect(() => {
    const dimensionsEvent = Dimensions.addEventListener('change', changeDimensions);
    changeDimensions({ window: Dimensions.get('window') });

    loadStore();

    return () => {
      dimensionsEvent.remove();
    };
  }, []);

  const contextValues: ThemeContextValues = {
    theme,
    switchThemeMode,
    changeFont,
    dimensions,
    orientation,
    safeAreaInsets: insets,
  };

  return (
    <ThemeContext.Provider
      value={contextValues}
      children={children}
    />
  );
};

export default ThemeContext;
