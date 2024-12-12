import { StyleSheet } from 'react-native';

import { COMMON_BUTTON_CONSTANTS } from '@constants';
import { globalStyles } from '@themes/globalStyles';

const { CONTAINER_HEIGHT, CONTAINER_SHAPE, GAP, PADDING_HORIZONTAL } =
  COMMON_BUTTON_CONSTANTS.MEASUREMENTS;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.rowCenter,
    height: CONTAINER_HEIGHT,
    paddingHorizontal: PADDING_HORIZONTAL,
    gap: GAP,
    borderRadius: CONTAINER_SHAPE,
  },
});

export default styles;
