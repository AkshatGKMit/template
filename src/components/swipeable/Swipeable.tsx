import {
  View,
  Text,
  PanResponder,
  Animated,
  Easing,
  GestureResponderEvent,
  PanResponderGestureState,
  Button,
} from 'react-native';
import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { defaultLayout, SlideDirection } from '@constants';
import { Animation } from '@utility/helpers';
import ThemeContext from '@config/ThemeContext';

const Swipeable = ({
  children,
  leftChild,
  rightChild,
  dismissDirection,
  onDismiss,
}: SlidableProps) => {
  const { dimensions } = useContext(ThemeContext);
  const layoutRef = useRef<ObjectLayout>(defaultLayout);

  useEffect(() => {
    console.log('In Use Effect: ', layoutRef);
  }, [layoutRef]);

  const componentAnimation = useRef(new Animated.Value(1)).current;
  const viewAnimation = useRef(new Animated.Value(0)).current;

  const onPanResponderMove = useCallback(
    (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
      const { dx } = gesture;
      const moveDirection: SlideDirection = dx < 0 ? SlideDirection.left : SlideDirection.right;
      const movedLength: number = moveDirection === SlideDirection.left ? -dx : dx;
      const maxSlideLength = layoutRef.current.width / 4;

      const newGesture: PanResponderGestureState = {
        ...gesture,
        dx: (moveDirection === SlideDirection.left ? -movedLength : movedLength) / dimensions.width,
      };

      if (movedLength < maxSlideLength)
        Animated.event([null, { dx: viewAnimation }], { useNativeDriver: false })(_, newGesture);
    },
    [viewAnimation],
  );

  const onPanResponderRelease = useCallback(
    (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
      const { dx } = gesture;
      const moveDirection: SlideDirection = dx < 0 ? SlideDirection.left : SlideDirection.right;
      const movedLength: number = moveDirection === SlideDirection.left ? -dx : dx;

      const minimumMoveLengthToDismiss = layoutRef.current.width / 4;

      if (movedLength >= minimumMoveLengthToDismiss && moveDirection === dismissDirection) {
        Animation.timing(viewAnimation, 1, 1000, Easing.out(Easing.ease)).start(() =>
          Animation.timing(componentAnimation, 0, 1000, Easing.out(Easing.ease), false).start(
            () => {
              onDismiss?.();
            },
          ),
        );
        return;
      } else Animation.timing(viewAnimation, 0, 100, Easing.bounce).start();
    },
    [dismissDirection, viewAnimation, componentAnimation],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  );

  return (
    <Animated.View
      style={{
        height: layoutRef.current.height
          ? componentAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, layoutRef.current.height],
            })
          : null,
        overflow: 'hidden',
        backgroundColor: 'yellow',
      }}
    >
      <View
        style={{
          position: 'absolute',
          height: layoutRef.current.height,
          width: layoutRef.current.width,
          flexDirection: 'row',
          backgroundColor: 'black',
          zIndex: 0,
          flex: 1,
        }}
      >
        {leftChild}
        {rightChild}
      </View>
      <Animated.View
        onLayout={(e) => {
          const { height: h, width: w, x, y } = e.nativeEvent.layout;
          layoutRef.current = {
            height: h,
            width: w,
            top: y,
            left: x,
            bottom: y + h,
            right: x + w,
          };
        }}
        style={{
          transform: [
            {
              translateX: viewAnimation.interpolate({
                inputRange: [-1, 1],
                outputRange: [-layoutRef.current.width, layoutRef.current.width],
              }),
            },
          ],
        }}
        {...panResponder.current.panHandlers}
      >
        {children}
        <Text style={{ position: 'absolute', zIndex: 10 }}>
          {JSON.stringify(layoutRef.current)}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Swipeable);
