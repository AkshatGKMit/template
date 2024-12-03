import { View, Pressable, Animated } from 'react-native';

import { useAppSelector } from '@store';
import { globalStyles } from '@themes/globalStyles';
import { Animation } from '@utility/helpers';

import styles from './styles';

const RippleButton = (props: RippleButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);
  const opacity = Animation.newValue(0);
  const scale = Animation.newValue(0);

  const { children, rippleColor, onPress, borderRadius } = props;
  const ANIM_DURATION = 120;

  const animatePressIn = () => {
    Animation.parallel([
      Animation.timing(opacity, 1, ANIM_DURATION * 1.5),
      Animation.timing(scale, 1, ANIM_DURATION),
    ]).start();
  };

  const animatePressOut = () => {
    Animation.timing(opacity, 0, ANIM_DURATION).start(({ finished }) => {
      if (finished) {
        scale.setValue(0);
      }
    });
  };

  const rippleContainerStyles = [
    styles.rippleContainer,
    {
      opacity,
      transform: [{ scale }],
      borderRadius,
      backgroundColor: rippleColor ?? theme.underlay(0.5),
    },
  ];

  return (
    <View style={globalStyles.positionRelative}>
      <Pressable
        onPress={onPress}
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
      >
        <View
          {...props}
          style={styles.parentContainer}
        >
          {children}
        </View>
        <Animated.View style={rippleContainerStyles} />
      </Pressable>
    </View>
  );
};

export default RippleButton;
