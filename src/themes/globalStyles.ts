import { createThemedStyles } from '@config/useStyles';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const GlobalThemedStyles = createThemedStyles((theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
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
});

export default GlobalThemedStyles;
