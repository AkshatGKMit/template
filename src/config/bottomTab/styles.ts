import { StyleSheet } from 'react-native';

import { BOTTOM_TAB_CONSTANTS } from '@constants';
import { globalStyles } from '@themes/globalStyles';

const {
  ACTIVE_INDICATOR_HEIGHT,
  ACTIVE_INDICATOR_WIDTH,
  BADGE_SHAPE,
  BADGE_SIZE,
  BOTTOM_PADDING,
  CONTAINER_GAP,
  CONTAINER_HEIGHT,
  ICON_SIZE,
  INDICATOR_LABEL_GAP,
  TARGET_SIZE,
  TOP_PADDING,
} = BOTTOM_TAB_CONSTANTS.MEASUREMENTS;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: CONTAINER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: TOP_PADDING,
    gap: CONTAINER_GAP,
  },
  tab: {
    ...globalStyles.columnCenter,
    gap: INDICATOR_LABEL_GAP,
  },
  iconContainer: {
    ...globalStyles.rowCenter,
    height: ACTIVE_INDICATOR_HEIGHT,
    width: ACTIVE_INDICATOR_WIDTH,
  },
});

export default styles;
