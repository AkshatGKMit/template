import { View, Text, PanResponder, Animated, Easing } from 'react-native';
import React, { useRef, useState } from 'react';
import { defaultLayout } from '@constants';
import { Animation } from '@utility/helpers';

const Dismissible = () => {
  const layoutRef = useRef<ObjectLayout>(defaultLayout);

  const viewAnimation = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const isMovedRight = gesture.dx > 0;
        const movedLength = isMovedRight ? gesture.dx : -gesture.dx;

        if (movedLength < layoutRef.current.width / 4)
          Animated.event([null, { dx: viewAnimation }], { useNativeDriver: false })(_, gesture);
      },
      onPanResponderRelease: (_, gesture) => {
        Animation.timing(viewAnimation, 0, 100, Easing.bounce).start();
      },
    }),
  ).current;

  return (
    <View>
      <View
        style={{
          position: 'absolute',
          height: layoutRef.current.height,
          width: layoutRef.current.width,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'lightgreen',
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'cyan',
          }}
        />
      </View>
      <Animated.View
        style={{
          width: '100%',
          height: 70,
          backgroundColor: 'blue',
          transform: [{ translateX: viewAnimation }],
        }}
        onLayout={(e) => {
          e.target.measure(
            (x, y, w, h) =>
              (layoutRef.current = {
                height: h,
                width: w,
                top: y,
                left: x,
                bottom: y + h,
                right: x + w,
              }),
          );
        }}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default Dismissible;
