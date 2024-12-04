import { Animated, Pressable } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { FLIP_CARD_SIDE, FLIP_DIRECTION } from '@constants';
import { Animation } from '@utility/helpers';

const FlipCard = (props: FlipCardProps) => {
  const {
    front,
    back,
    onFront,
    onBack,
    style,
    duration = 500,
    side = FLIP_CARD_SIDE.FRONT,
    direction = FLIP_DIRECTION.HORIZONTAL,
  } = props;

  const [isFirstFlip, setFirstFlip] = useState(false);
  const [isFront, setFront] = useState(true);

  const flipAnim = useRef(new Animated.Value(-1)).current;

  const startAnimation = useCallback(() => {
    setFirstFlip(true);
    if (back) {
      Animation.timing(flipAnim, 0, duration).start(() => {
        setFront((prev) => !prev);
        Animation.timing(flipAnim, -1, duration).start();
      });
    }
  }, [flipAnim, isFront, back]);

  useEffect(() => {
    setFront(side === FLIP_CARD_SIDE.FRONT);
  }, []);

  useEffect(() => {
    isFront ? onFront?.() : onBack?.();
  }, [isFront, onFront, onBack]);

  const transform = useMemo(() => {
    const interpolatedValue = flipAnim.interpolate({
      inputRange: [-1, 1],
      outputRange: ['0deg', '180deg'],
    });

    return direction === FLIP_DIRECTION.HORIZONTAL
      ? { transform: [{ rotateY: interpolatedValue }] }
      : { transform: [{ rotateX: interpolatedValue }] };
  }, [flipAnim, direction]);

  return (
    <Pressable onPress={startAnimation}>
      <Animated.View style={[style, transform]}>{isFront ? front : back}</Animated.View>
    </Pressable>
  );
};

export default FlipCard;
