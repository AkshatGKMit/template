import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      loaderView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colorWithOpacity(theme.inverted.primaryBackground, 0.6),
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      },
      processInfo: {
        color: theme.primaryBackground,
        fontSize: FontSize.labelMedium,
      },
      invertedView: {
        backgroundColor: colorWithOpacity(theme.primaryBackground, 0.6),
      },
    });
  }, [theme]);
};

export default ThemedStyles;
