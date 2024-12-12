import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useScalingMetrics from '@config/useScalingMetrics';
import { useAppSelector } from '@store';
import { Colors, Typography } from '@themes';

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

export const getShadowStyle = (level: Elevation, color?: string) => {
  return {
    ...Platform.select({
      ios: {
        shadowColor: color ?? Colors.black,
        shadowOffset: {
          width: 0,
          height: level > 0 ? level : 0,
        },
        shadowOpacity: level > 0 ? 0.2 : 0,
        shadowRadius: level > 0 ? level : 0,
      },
      android: {
        elevation: level,
      },
    }),
  };
};

export const getTypography = (fontSize: number) => {
  for (const key in Typography) {
    if (Typography[key].fontSize === fontSize) {
      return Typography[key];
    }
  }

  return null;
};
