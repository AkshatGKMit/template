import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';
import { createThemedStyles } from '@config/useStyles';

const ThemedStyles = createThemedStyles((theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    icon: {
      color: colors.defaultIcon,
      fontSize: FontSize.bodyLarge,
    },
  });
});

export default ThemedStyles;
