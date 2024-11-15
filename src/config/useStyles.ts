import { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import ThemeContext from './ThemeContext';

const useStyles = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export function createStyles<T extends NamedStyles<T>>(styles: T): T {
  return StyleSheet.create(styles);
}

export function createThemedStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  styleFunction: (
    theme: ThemeConfig,
    dimensions: WindowDimensions,
    orientation: Orientation,
    safeAreaInsets: SafeAreaInsets,
  ) => T,
) {
  return () => {
    const { theme, dimensions, orientation, safeAreaInsets } = useStyles();

    const styles = useMemo(
      () => styleFunction(theme, dimensions, orientation, safeAreaInsets),
      [theme, dimensions, orientation, safeAreaInsets],
    );

    return styles;
  };
}
