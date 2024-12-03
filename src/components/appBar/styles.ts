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
      ...globalStyles.columnCenter,
      height: targetSize,
      backgroundColor: 'yellow',
    },
    trailingContainer: {
      ...globalStyles.columnCenter,
      height: targetSize,
      width: targetSize,
      backgroundColor: 'red',
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
