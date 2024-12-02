import { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import ThemeContext from './ThemeContext';
import useScalingMetrics from './useScalingMetrics';
import { useAppSelector } from './store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    theme: ThemeColors,
    dimensions: WindowDimensions,
    orientation: Orientation,
    safeAreaInsets: SafeAreaInsets,
  ) => T,
) {
  return () => {
    const safeAreaInsets = useSafeAreaInsets();
    const { orientation, WH, WW } = useScalingMetrics();

    const theme = useAppSelector((state) => state.theme.colors);
    console.log(theme.screenGradient);

    const dimensions: WindowDimensions = {
      height: WH,
      width: WW,
    };

    const styles = useMemo(
      () => styleFunction(theme, dimensions, orientation, safeAreaInsets),
      [theme, dimensions, orientation, safeAreaInsets],
    );

    return styles;
  };
}
