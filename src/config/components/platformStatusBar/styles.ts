import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ThemedStyles = (theme: ThemeColors) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  return useMemo(() => {
    return StyleSheet.create({
      iosStatusBar: {
        height: statusBarHeight,
        width: '100%',
        backgroundColor: theme.statusBarColor,
      },
    });
  }, [theme, statusBarHeight]);
};

export default ThemedStyles;
