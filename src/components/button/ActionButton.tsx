import { View, Pressable, Animated } from 'react-native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import useRippleEffect from '@config/useRippleEffect';
import { COMMON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { Typography } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

import styles from './styles';

const { THEME, MEASUREMENTS } = COMMON_BUTTON_CONSTANTS;

const {
  DISABLED_CONTAINER_COLOR,
  DISABLED_LABEL_COLOR,
  DISABLED_ICON_COLOR,
  DISABLED_CONTAINER_OPACITY,
  DISABLED_LABEL_OPACITY,
  DISABLED_ICON_OPACITY,
} = THEME;

const { LEFT_PADDING_WITH_ICON, RIGHT_PADDING_WITH_ICON } = MEASUREMENTS;

const ActionButton = ({
  label,
  onPress,
  disabled,
  leadingIcon,
  trailingIcon,
  backgroundColor,
  labelColor,
  iconColor,
  borderColor,
  borderWidth,
  styleDisabledBackground = true,
}: ActionButtonProps) => {
  const { animatePressIn, animatePressOut, rippleStyles, rippleContainerStyle } = useRippleEffect();

  const theme = useAppSelector(({ theme }) => theme.colors);

  const buttonBackgroundColor =
    disabled && styleDisabledBackground
      ? colorWithOpacity(theme.all[DISABLED_CONTAINER_COLOR], DISABLED_CONTAINER_OPACITY)
      : (backgroundColor ?? theme.all.surfaceContainerLow);

  const buttonLabelColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_LABEL_COLOR], DISABLED_LABEL_OPACITY)
    : (labelColor ?? theme.all.primary);

  const buttonIconColor = disabled
    ? colorWithOpacity(theme.all[DISABLED_ICON_COLOR], DISABLED_ICON_OPACITY)
    : (iconColor ?? theme.all.primary);

  const containerStyle = [
    rippleContainerStyle,
    styles.container,
    {
      paddingLeft: !!leadingIcon ? LEFT_PADDING_WITH_ICON : undefined,
      paddingRight: !!trailingIcon ? RIGHT_PADDING_WITH_ICON : undefined,
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
            color={buttonLabelColor}
          />
        )}
        <TextBlock
          typography={Typography.labelLarge}
          color={buttonLabelColor}
          numberOfLines={1}
        >
          {label}
        </TextBlock>
        {trailingIcon && (
          <Icon
            icon={trailingIcon}
            size={Typography.labelLarge.fontSize}
            color={buttonLabelColor}
          />
        )}
        <Animated.View style={rippleStyles} />
      </View>
    </Pressable>
  );
};

export default ActionButton;
