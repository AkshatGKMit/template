import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: theme.screenBGColor,
      },
      flexRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      flexColumn: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
    });
  }, [theme]);
};

export default ThemedStyles;
