import { View, Text, Animated, TouchableWithoutFeedback } from 'react-native';
import React, { useContext } from 'react';
import useScalingMetrics from '@config/useScalingMetrics';
import ThemeContext from '@config/ThemeContext';
import { FabBorderRadius, FabSize } from '@constants';
import Icon from '@components/icon';

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const { scaleSize: dp } = useScalingMetrics();

  const { theme } = useContext(ThemeContext);

  const {
    icon,
    onPress,
    zIndex,
    style,
    onLayout,
    iconColor = theme.colors.text,
    borderRadius = FabBorderRadius.auto,
    size: padding = FabSize.normal,
    backgroundColor = theme.colors.primary,
    margin = 30,
  } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        onLayout={onLayout}
        style={[
          style,
          {
            position: 'absolute',
            zIndex,
            bottom: 0,
            right: 0,
            marginRight: margin,
            marginBottom: margin,
            backgroundColor,
            padding,
            borderRadius,
            shadowColor: theme.colors.inverted.main,
            shadowOffset: {
              height: 1,
              width: 1,
            },
            shadowRadius: 3,
            shadowOpacity: 0.5,
            elevation: 4,
          },
        ]}
      >
        <Icon
          {...icon}
          style={{ color: iconColor, fontSize: 40, transform: [] }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default FloatingActionButton;
