import { View, Pressable, StyleProp, ViewStyle, Animated } from 'react-native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import useRippleEffect from '@config/useRippleEffect';
import { COMPONENTS_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { Typography } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { colorWithOpacity } from '@utility/helpers';

const ActionButton = ({
  label,
  onPress,
  disabled,
  style,
  icon,
  borderRadius,
  backgroundColor,
  foregroundColor,
  borderColor,
  borderWidth,
}: ActionButtonProps) => {
  const { animatePressIn, animatePressOut, rippleStyles, rippleContainerStyle } = useRippleEffect();

  const theme = useAppSelector(({ theme }) => theme.colors);

  const {
    HEIGHT: containerHeight,
    DISABLED_BACKGROUND_OPACITY,
    DISABLED_FOREGROUND_OPACITY,
  } = COMPONENTS_CONSTANTS.BUTTON;

  const buttonBackgroundColor = disabled
    ? colorWithOpacity(theme.all.onSurface, DISABLED_BACKGROUND_OPACITY)
    : (backgroundColor ?? theme.all.surfaceContainerLow);
  const buttonForegroundColor = disabled
    ? colorWithOpacity(theme.all.onSurface, DISABLED_FOREGROUND_OPACITY)
    : (foregroundColor ?? theme.all.primary);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={animatePressIn}
      onPressOut={animatePressOut}
      disabled={disabled}
    >
      <View
        style={[
          rippleContainerStyle,
          style,
          {
            ...globalStyles.rowCenter,
            height: containerHeight,
            paddingLeft: !!icon ? 16 : 24,
            paddingRight: 24,
            gap: 8,
            borderRadius: borderRadius ?? 20,
            backgroundColor: buttonBackgroundColor,
            borderWidth,
            borderColor,
          },
        ]}
      >
        {icon && (
          <Icon
            icon={icon}
            size={Typography.labelLarge.fontSize}
            color={buttonForegroundColor}
          />
        )}
        <TextBlock
          typography={Typography.labelLarge}
          color={buttonForegroundColor}
          numberOfLines={1}
          style={{ opacity: disabled ? DISABLED_FOREGROUND_OPACITY : 1 }}
        >
          {label}
        </TextBlock>
        <Animated.View style={rippleStyles} />
      </View>
    </Pressable>
  );
};

export default ActionButton;
