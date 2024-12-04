import { StyleSheet } from 'react-native';

import { APP_BAR_CONSTANTS } from '@constants';
import { globalStyles } from '@themes/globalStyles';
import { createThemedStyles } from '@utility/styles';

const ThemedStyles = createThemedStyles((theme) => {
  const {
    HEIGHT: height,
    GAP: gap,
    PADDING_HORIZONTAL: paddingHorizontal,
    TARGET_SIZE: targetSize,
  } = APP_BAR_CONSTANTS;

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
