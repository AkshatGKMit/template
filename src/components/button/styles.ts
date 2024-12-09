import { StyleSheet } from 'react-native';

import { globalStyles } from '@themes/globalStyles';
import { COMPONENTS_CONSTANTS } from '@constants';

const { BORDER_RADIUS, PADDING_HORIZONTAL, GAP, HEIGHT } = COMPONENTS_CONSTANTS.BUTTON;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.rowCenter,
    height: HEIGHT,
    paddingHorizontal: PADDING_HORIZONTAL,
    gap: GAP,
    borderRadius: BORDER_RADIUS,
  },
});

export default styles;
