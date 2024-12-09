import { View, Pressable, StyleProp, ViewStyle } from 'react-native';

import Icon from '@components/icon';
import TextBlock from '@components/textBlock';

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
}: {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  icon?: IconType;
  borderRadius?: number;
  backgroundColor?: string;
  foregroundColor?: string;
}) => {
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
      disabled={disabled}
    >
      <View
        style={[
          style,
          {
            ...globalStyles.rowCenter,
            height: containerHeight,
            paddingLeft: !!icon ? 16 : 24,
            paddingRight: 24,
            gap: 8,
            borderRadius: borderRadius ?? 20,
            backgroundColor: buttonBackgroundColor,
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
      </View>
    </Pressable>
  );
};

export default ActionButton;
