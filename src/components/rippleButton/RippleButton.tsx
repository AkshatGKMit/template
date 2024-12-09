import { useState } from 'react';
import { View, Pressable, Animated, Easing, GestureResponderEvent } from 'react-native';

import { COMPONENTS_CONSTANTS } from '@constants';
import { Animation } from '@utility/helpers';

import styles from './styles';
import { useAppSelector } from '@store';

const RippleButton = (props: RippleButtonProps) => {
  const { MAX_OPACITY, MIN_SCALE, MAX_SCALE, RIPPLE_DURATION } = COMPONENTS_CONSTANTS.RIPPLE_BUTTON;

  const theme = useAppSelector(({ theme }) => theme.colors);

  const opacity = Animation.newValue(MAX_OPACITY);
  const scale = Animation.newValue(MIN_SCALE);

  const { children } = props;

  const animatePressIn = () => {
    Animation.timing(scale, MAX_SCALE, RIPPLE_DURATION, Easing.bezier(0.0, 0.0, 0.2, 1)).start();
  };

  const animatePressOut = () => {
    Animation.timing(opacity, 0, 0).start(({ finished }) => {
      if (finished) {
        scale.setValue(MIN_SCALE);
        opacity.setValue(MAX_OPACITY);
      }
    });
  };

  const rippleContainerStyles = [
    styles.rippleContainer,
    {
      backgroundColor: theme.inverted.main,
      transform: [{ scale }],
      opacity,
    },
  ];

  return (
    <Pressable
      {...props}
      onPressIn={animatePressIn}
      onPressOut={animatePressOut}
    >
      {children}
      <Animated.View style={rippleContainerStyles} />
    </Pressable>
  );
};

export default RippleButton;
