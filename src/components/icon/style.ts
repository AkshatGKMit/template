import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { FontSize } from '@themes';

const ThemedStyles = (theme: ThemeColors) => {
  return useMemo(() => {
    return StyleSheet.create({
      icon: {
        color: theme.defaultIcon,
        fontSize: FontSize.bodyLarge,
      },
    });
  }, [theme]);
};

export default ThemedStyles;
