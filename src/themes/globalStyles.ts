import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const GlobalThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: theme.primaryBackground,
      },
      rowCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      columnCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      flex1: {
        flex: 1,
      },
    });
  }, [theme]);
};

export default GlobalThemedStyles;
