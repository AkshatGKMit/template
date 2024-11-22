import { Animated, Pressable } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CardSide, FlipDirection } from '@constants';
import { Animation } from '@utility/helpers';

const FlipCard = (props: FlipCardProps) => {
  const {
    front,
    back,
    onFront,
    onBack,
    style,
    duration = 500,
    side = CardSide.front,
    direction = FlipDirection.horizontal,
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
    setFront(side === CardSide.front);
  }, []);

  useEffect(() => {
    isFront ? onFront?.() : onBack?.();
  }, [isFront, onFront, onBack]);

  const transform = useMemo(() => {
    const interpolatedValue = flipAnim.interpolate({
      inputRange: [-1, 1],
      outputRange: ['0deg', '180deg'],
    });

    return direction === FlipDirection.horizontal
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
