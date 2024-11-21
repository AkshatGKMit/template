import { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  Easing,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';

import { defaultLayout, SwipeDirection } from '@constants';
import { Animation } from '@utility/helpers';

import styles from './styles';

const Swipeable = ({
  children,
  leftChild,
  rightChild,
  dismissDirection,
  onDismiss,
  onSwipe,
  onSwipeFinished,
}: SwipeableProps) => {
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(SwipeDirection.left);

  const layoutRef = useRef<ObjectLayout>(defaultLayout);

  const containerAnimation = useRef(new Animated.Value(1)).current;
  const viewAnimation = useRef(new Animated.Value(0)).current;

  const _measure = useCallback((e: LayoutChangeEvent) => {
    const { height: h, width: w, x, y } = e.nativeEvent.layout;

    layoutRef.current = {
      height: Math.floor(h),
      width: Math.floor(w),
      top: Math.floor(y),
      left: Math.floor(x),
      bottom: Math.floor(y + h),
      right: Math.floor(x + w),
    };
  }, []);

  const viewOutAnimation = Animation.timing(viewAnimation, 1, 1000, Easing.out(Easing.ease));

  const containerHidingAnimation = Animation.timing(
    containerAnimation,
    0,
    1000,
    Easing.out(Easing.ease),
    false,
  );

  const animationSequence = Animated.sequence([viewOutAnimation, containerHidingAnimation]);

  const onPanResponderMove = useCallback(
    (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
      const { dx } = gesture;
      const direction = dx < 0 ? SwipeDirection.left : SwipeDirection.right;
      setSwipeDirection(direction);

      onSwipe?.(direction);

      const newGesture: PanResponderGestureState = {
        ...gesture,
        dx: dx / layoutRef.current.width,
      };

      Animated.event([null, { dx: viewAnimation }], { useNativeDriver: false })(_, newGesture);
    },
    [viewAnimation, swipeDirection, layoutRef],
  );

  const onPanResponderRelease = useCallback(
    (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
      const { dx } = gesture;

      const direction: SwipeDirection = dx < 0 ? SwipeDirection.left : SwipeDirection.right;
      const displacement: number = direction === SwipeDirection.left ? -dx : dx;

      const minimumDisplacementToDismiss = layoutRef.current.width / 4;

      const shouldDismiss =
        onDismiss && displacement >= minimumDisplacementToDismiss && direction === dismissDirection;

      if (shouldDismiss) {
        animationSequence.start(({ finished }) => {
          if (finished) onDismiss?.();
        });
        return;
      }

      onSwipeFinished?.(direction);
      Animation.timing(viewAnimation, 0, 100, Easing.bounce).start();
    },
    [dismissDirection, viewAnimation, containerAnimation, swipeDirection],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;

  const containerHeight = containerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, layoutRef.current.height],
  });

  const translateX = viewAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: [-layoutRef.current.width, layoutRef.current.width],
  });

  const containerStyles = useMemo(
    () => [{ height: layoutRef.current.height ? containerHeight : null }, styles.container],
    [layoutRef, containerHeight, styles],
  );

  const backgroundViewStyles = useMemo(
    () => [
      styles.backgroundView,
      {
        height: layoutRef.current.height,
        width: layoutRef.current.width,
      },
    ],
    [styles, layoutRef.current],
  );

  const mainViewStyles = useMemo(() => ({ transform: [{ translateX }] }), [translateX]);

  const _renderMain = useCallback(
    () => (
      <Animated.View
        onLayout={_measure}
        style={mainViewStyles}
        {...panResponder.panHandlers}
      >
        {children}
        <Text style={{ position: 'absolute', zIndex: 10 }}>{swipeDirection}</Text>
      </Animated.View>
    ),
    [children, panResponder, layoutRef],
  );

  const _renderBackgroundView = useCallback(
    () => (
      <View style={backgroundViewStyles}>
        {swipeDirection === SwipeDirection.left ? rightChild : leftChild}
      </View>
    ),
    [swipeDirection, leftChild, rightChild, layoutRef, backgroundViewStyles],
  );

  return (
    <Animated.View style={containerStyles}>
      {_renderBackgroundView()}
      {_renderMain()}
    </Animated.View>
  );
};

export default memo(Swipeable);
