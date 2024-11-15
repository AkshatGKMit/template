import { createThemedStyles } from '@config/useStyles';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const ThemedStyles = createThemedStyles((theme, _, __, insets) => {
  const { colors } = theme;

  return StyleSheet.create({
    statusBar: {
      height: insets.top,
      width: '100%',
      backgroundColor: colors.statusBar,
    },
  });
});
export default ThemedStyles;
