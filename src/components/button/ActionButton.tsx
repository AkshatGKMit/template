import { View, Pressable, Animated } from 'react-native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';
import useRippleEffect from '@config/useRippleEffect';
import { COMPONENTS_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { Typography } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { colorWithOpacity } from '@utility/helpers';
import styles from './styles';

const ActionButton = ({
  label,
  onPress,
  disabled,
  style,
  icon,
  backgroundColor,
  foregroundColor,
  borderColor,
  borderWidth,
  styleDisabledBackground = true,
}: ActionButtonProps) => {
  const { animatePressIn, animatePressOut, rippleStyles, rippleContainerStyle } = useRippleEffect();

  const theme = useAppSelector(({ theme }) => theme.colors);

  const { DISABLED_BACKGROUND_OPACITY, DISABLED_FOREGROUND_OPACITY } = COMPONENTS_CONSTANTS.BUTTON;

  const buttonBackgroundColor =
    disabled && styleDisabledBackground
      ? colorWithOpacity(theme.all.onSurface, DISABLED_BACKGROUND_OPACITY)
      : (backgroundColor ?? theme.all.surfaceContainerLow);

  const buttonForegroundColor = disabled
    ? colorWithOpacity(theme.all.onSurface, DISABLED_FOREGROUND_OPACITY)
    : (foregroundColor ?? theme.all.primary);

  const containerStyle = [
    rippleContainerStyle,
    styles.container,
    {
      paddingLeft: !!icon ? 16 : undefined,
      backgroundColor: buttonBackgroundColor,
      borderWidth,
      borderColor,
    },
  ];

  const textStyle = { opacity: disabled ? DISABLED_FOREGROUND_OPACITY : 1 };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={animatePressIn}
      onPressOut={animatePressOut}
      disabled={disabled}
    >
      <View style={containerStyle}>
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
          style={textStyle}
        >
          {label}
        </TextBlock>
        <Animated.View style={rippleStyles} />
      </View>
    </Pressable>
  );
};

export default ActionButton;
