import { StyleSheet } from 'react-native';

import { SNACKBAR_CONSTANTS } from '@constants';
import { getShadowStyle } from '@utility/styles';

const { MEASUREMENTS, THEME } = SNACKBAR_CONSTANTS;

const { CONTAINER_ELEVATION, CONTAINER_SHADOW_COLOR } = THEME;

const { CONTAINER_GAP, CONTAINER_HEIGHT_ONE_LINE, CONTAINER_PADDING, CONTAINER_SHAPE } =
  MEASUREMENTS;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: CONTAINER_HEIGHT_ONE_LINE,
    borderRadius: CONTAINER_SHAPE,
    paddingHorizontal: CONTAINER_PADDING,
    flexDirection: 'row',
    gap: CONTAINER_GAP,
    alignItems: 'center',
    ...getShadowStyle(CONTAINER_ELEVATION, CONTAINER_SHADOW_COLOR),
  },
});

export default styles;
