import { memo } from 'react';
import { Animated, Pressable, TouchableHighlight, View } from 'react-native';

import Icon from '@components/icon';
import useRippleEffect from '@config/useRippleEffect';
import { useAppSelector } from '@store';

import styles from './styles';
import { ICON_BUTTON_CONSTANTS } from '@constants/componentSpecifications';
import { globalStyles } from '@themes/globalStyles';
import { colorWithOpacity } from '@utility/helpers';

const { COLOR, MEASUREMENTS, STANDARD } = ICON_BUTTON_CONSTANTS;
const { CONTAINER_SIZE, DISABLED_CONTAINER_OPACITY, DISABLED_ICON_OPACITY, SHAPE, ICON_SIZE } =
  MEASUREMENTS;

const IconButtonMain = (props: IconButtonMainProps) => {
  const theme = useAppSelector((state) => state.theme.colors);
  const { animatePressIn, animatePressOut, rippleContainerStyle, rippleStyles } = useRippleEffect();

  const { icon, disabled, backgroundColor, color, onPress, borderColor, borderWidth, size } = props;

  const containerColor = disabled
    ? colorWithOpacity(theme.all[COLOR.DISABLED_CONTAINER], DISABLED_CONTAINER_OPACITY)
    : (backgroundColor ?? theme.all[ICON_BUTTON_CONSTANTS.STANDARD.CONTAINER]);

  const iconColor = disabled
    ? colorWithOpacity(theme.all[COLOR.DISABLED_ICON_COLOR], DISABLED_ICON_OPACITY)
    : (color ?? theme.all[STANDARD.ICON]);

  return (
    <Pressable
      onPressIn={animatePressIn}
      onPressOut={animatePressOut}
      onPress={onPress}
    >
      <View
        style={[
          {
            height: CONTAINER_SIZE,
            width: CONTAINER_SIZE,
            backgroundColor: containerColor,
            borderRadius: SHAPE,
            borderColor,
            borderWidth,
          },
          globalStyles.columnCenter,
          rippleContainerStyle,
        ]}
      >
        <Icon
          icon={icon}
          color={iconColor}
          size={size ?? ICON_SIZE}
        />
        <Animated.View style={rippleStyles} />
      </View>
    </Pressable>
  );
};

export default memo(IconButtonMain);
