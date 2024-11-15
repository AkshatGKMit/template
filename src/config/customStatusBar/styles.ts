import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = ({ colors }: ThemeConfig, statusBarHeight: number) => {
  return useMemo(() => {
    return StyleSheet.create({
      statusBar: {
        height: statusBarHeight,
        width: '100%',
        backgroundColor: colors.statusBar,
      },
    });
  }, [colors, statusBarHeight]);
};

export default ThemedStyles;
