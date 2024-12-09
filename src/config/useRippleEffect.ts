import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

import { useAppSelector } from '@store';
import { Animation } from '@utility/helpers';
import { COMPONENTS_CONSTANTS } from '@constants';
import { globalStyles } from '@themes/globalStyles';

const rippleStyle: StyleProp<ViewStyle> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '100%',
  aspectRatio: 1,
  borderRadius: 1000,
};

const rippleContainerStyle: StyleProp<ViewStyle> = {
  ...globalStyles.positionRelative,
  overflow: 'scroll',
};

const useRippleEffect = () => {
  const { MAX_OPACITY, MIN_SCALE, MAX_SCALE, RIPPLE_DURATION } = COMPONENTS_CONSTANTS.RIPPLE_BUTTON;

  const theme = useAppSelector(({ theme }) => theme.colors);

  const opacity = Animation.newValue(MAX_OPACITY);
  const scale = Animation.newValue(MIN_SCALE);

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

  const rippleStyles = [
    rippleStyle,
    {
      backgroundColor: theme.inverted.main,
      transform: [{ scale }],
      opacity,
    },
  ];

  return { animatePressIn, animatePressOut, rippleStyles, rippleContainerStyle };
};

export default useRippleEffect;
