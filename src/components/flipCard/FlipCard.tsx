import { View, Text, Animated, Pressable, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '@themes';
import { Animation } from '@utility/helpers';

const FlipCard = () => {
  const [isFront, setFront] = useState(true);

  const flipAnim = useRef(new Animated.Value(-1)).current;

  const startAnimation = () => {
    Animation.timing(flipAnim, 0, 500).start(() => {
      setFront((prev) => !prev);
      Animation.timing(flipAnim, -1, 500).start();
    });
  };

  return (
    <Pressable onPress={startAnimation}>
      <Animated.View
        style={{
          height: 300,
          width: 300,
          backgroundColor: 'pink',
          alignItems: 'center',
          justifyContent: 'center',
          transform: [
            {
              rotateY: flipAnim.interpolate({
                inputRange: [-1, 1],
                outputRange: ['0deg', '180deg'],
              }),
            },
          ],
        }}
      >
        <Text style={{ fontWeight: '900', fontSize: 50 }}>{isFront ? 'Front' : 'Back'} Card</Text>
      </Animated.View>
    </Pressable>
  );
};

export default FlipCard;
