import { View, Pressable, Animated } from 'react-native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import useRippleEffect from '@config/useRippleEffect';
import { COMMON_BUTTON_CONSTANTS } from '@constants/componentSpecifications';
import { useAppSelector } from '@store';
import { Typography } from '@themes';
import { colorWithOpacity } from '@utility/helpers';
import styles from './styles';

const ActionButton = ({
  label,
  onPress,
  disabled,
  leadingIcon,
  trailingIcon,
  backgroundColor,
  foregroundColor,
  borderColor,
  borderWidth,
  styleDisabledBackground = true,
}: ActionButtonProps) => {
  const { animatePressIn, animatePressOut, rippleStyles, rippleContainerStyle } = useRippleEffect();

  const theme = useAppSelector(({ theme }) => theme.colors);

  const { MEASUREMENTS, COLOR } = COMMON_BUTTON_CONSTANTS;

  const { DISABLED_CONTAINER_OPACITY, DISABLED_LABEL_OPACITY } = MEASUREMENTS;
  const { DISABLED_CONTAINER, DISABLED_LABEL_COLOR } = COLOR;

  const buttonBackgroundColor =
    disabled && styleDisabledBackground
      ? colorWithOpacity(theme.all[DISABLED_CONTAINER], DISABLED_CONTAINER_OPACITY)
      : (backgroundColor ?? theme.all.surfaceContainerLow);

  const buttonForegroundColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_LABEL_COLOR], DISABLED_LABEL_OPACITY)
    : (foregroundColor ?? theme.all.primary);

  const containerStyle = [
    rippleContainerStyle,
    styles.container,
    {
      paddingLeft: !!leadingIcon ? 16 : undefined,
      paddingRight: !!trailingIcon ? 16 : undefined,
      backgroundColor: buttonBackgroundColor,
      borderWidth,
      borderColor,
    },
  ];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={animatePressIn}
      onPressOut={animatePressOut}
      disabled={disabled}
    >
      <View style={containerStyle}>
        {leadingIcon && (
          <Icon
            icon={leadingIcon}
            size={Typography.labelLarge.fontSize}
            color={buttonForegroundColor}
          />
        )}
        <TextBlock
          typography={Typography.labelLarge}
          color={buttonForegroundColor}
          numberOfLines={1}
        >
          {label}
        </TextBlock>
        {trailingIcon && (
          <Icon
            icon={trailingIcon}
            size={Typography.labelLarge.fontSize}
            color={buttonForegroundColor}
          />
        )}
        <Animated.View style={rippleStyles} />
      </View>
    </Pressable>
  );
};

export default ActionButton;
