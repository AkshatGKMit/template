import { StyleSheet } from 'react-native';

import { AppBarConstants } from '@constants';
import { globalStyles } from '@themes/globalStyles';
import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme) => {
  const { height, gap, paddingHorizontal, targetSize } = AppBarConstants;

  return StyleSheet.create({
    container: {
      ...globalStyles.rowCenter,
      height,
      width: '100%',
      gap,
      paddingHorizontal,
    },
    extendedTrailingContainer: {
      ...globalStyles.rowCenter,
      height: targetSize,
      gap,
    },
    trailingContainer: {
      ...globalStyles.columnCenter,
      height: targetSize,
      width: targetSize,
    },
    title: {
      ...globalStyles.flex1,
      textAlignVertical: 'center',
    },
    centerAlignedTitle: {
      textAlign: 'center',
    },
  });
});

export default ThemedStyles;
