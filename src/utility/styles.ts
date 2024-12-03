import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useScalingMetrics from '@config/useScalingMetrics';
import { useAppSelector } from '@store';

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
