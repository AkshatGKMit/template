import { View, Pressable, Animated } from 'react-native';

import Icon from '@components/icon';
import { Animation } from '@utility/helpers';

const RippleButton = () => {
  const opacity = Animation.newValue(0);
  const scale = Animation.newValue(0);

  const ANIM_DURATION = 80;

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

  return (
    <View style={{ position: 'relative' }}>
      <Pressable
        onPress={() => {}}
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
      >
        <View style={{ padding: 3 }}>
          <Icon
            family={'MaterialIcons'}
            name="menu"
          />
        </View>
        <Animated.View
          style={{
            opacity,
            transform: [{ scale }],
            position: 'absolute',
            zIndex: -1,
            backgroundColor: 'red',
            height: '100%',
            width: '100%',
          }}
        />
      </Pressable>
    </View>
  );
};

export default RippleButton;
