import { View, Text, LayoutChangeEvent, Animated } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

import ThemeContext from '@config/ThemeContext';
import { Animation } from '@utility/helpers';

const SnackBar = () => {
  const { safeAreaInsets: insets, dimensions } = useContext(ThemeContext);

  const [height, setHeight] = useState<number>(0);

  const positionAnim = useRef(new Animated.Value(0)).current;

  function _measure(e: LayoutChangeEvent): void {
    const { height } = e.nativeEvent.layout;
    setHeight(height);
  }

  const animate = () => {
    const showAnim = Animation.timing(positionAnim, 1, 200);
    const delayAnim = Animation.delay(3000);
    const hideAnim = Animation.timing(positionAnim, 0, 200);

    Animated.sequence([showAnim, delayAnim, hideAnim]).start();
  };

  useEffect(() => {
    if (height) animate();
  }, [height, dimensions]);

  const translateY = positionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [dimensions.height, dimensions.height - height],
  });

  return (
    <Animated.View
      onLayout={_measure}
      style={{
        position: 'absolute',
        backgroundColor: 'grey',
        width: '100%',
        paddingBottom: insets.bottom,
        transform: [{ translateY }],
      }}
    >
      <View>
        <Text>SnackBar</Text>
      </View>
    </Animated.View>
  );
};

export default SnackBar;
