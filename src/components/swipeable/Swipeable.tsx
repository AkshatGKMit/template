import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

import { ComponentsConstants, defaultLayout, SwipeDirection } from '@constants';
import { Animation } from '@utility/helpers';

import styles from './styles';

const { thresholdAnimationDuration } = ComponentsConstants.swipeable;

const Swipeable = ({
  children,
  leftChild,
  rightChild,
  dismissDirection,
  onDismiss,
  onSwipeStart,
  onSwipe,
  onSwipeFinished,
}: SwipeableProps) => {
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(SwipeDirection.null);

  const lastSwipedDirection = useRef<SwipeDirection>(null);
  const layoutDimensionsRef = useRef<ObjectLayout>(defaultLayout);

  const animatedContainerHeight = Animation.newValue(1);
  const animatedChildrenPositionX = Animation.newValue(0);

  const _onLayoutChange = useCallback((e: LayoutChangeEvent) => {
    const { height: h, width: w, x, y } = e.nativeEvent.layout;

    const newLayout = {
      height: Math.floor(h),
      width: Math.floor(w),
      top: Math.floor(y),
      left: Math.floor(x),
      bottom: Math.floor(y + h),
      right: Math.floor(x + w),
    };

    layoutDimensionsRef.current = newLayout;
  }, []);

  const slideOutAnimation = Animation.timing(
    animatedChildrenPositionX,
    1,
    thresholdAnimationDuration,
    Easing.out(Easing.ease),
  );

  const containerDismissingAnimation = Animation.timing(
    animatedContainerHeight,
    0,
    thresholdAnimationDuration,
    Easing.out(Easing.ease),
    false,
  );

  const dismissAnimationSequence = Animation.sequence([
    slideOutAnimation,
    containerDismissingAnimation,
  ]);

  const handlePanResponderMove = useCallback(
    (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
      const { dx } = gesture;

      const direction = dx < 0 ? SwipeDirection.left : SwipeDirection.right;

      setSwipeDirection(direction);

      if (direction !== lastSwipedDirection.current) {
        lastSwipedDirection.current = direction;
        onSwipeStart?.(direction, gesture);
      }

      onSwipe?.(direction, gesture);

      const newGesture: PanResponderGestureState = {
        ...gesture,
        dx: dx / layoutDimensionsRef.current.width,
      };

      Animation.event([{ dx: animatedChildrenPositionX }])(_, newGesture);
    },
    [onSwipe, layoutDimensionsRef.current, animatedChildrenPositionX, lastSwipedDirection.current],
  );

  const handlePanResponderRelease = useCallback(
    (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
      const { dx } = gesture;
      const displacement: number = Math.abs(dx);

      const minimumDisplacementForAction = layoutDimensionsRef.current.width / 3;

      const shouldPerformAction = displacement >= minimumDisplacementForAction;

      const shouldDismiss =
        onDismiss && shouldPerformAction && lastSwipedDirection.current === dismissDirection;

      if (shouldDismiss) {
        dismissAnimationSequence.start(({ finished }) => {
          if (finished) onDismiss?.();
        });
        return;
      }

      if (shouldPerformAction) onSwipeFinished?.(lastSwipedDirection.current, gesture);

      Animation.timing(
        animatedChildrenPositionX,
        0,
        thresholdAnimationDuration / 5,
        Easing.bounce,
      ).start(() => setSwipeDirection(null));
    },
    [
      layoutDimensionsRef.current,
      onDismiss,
      dismissAnimationSequence,
      animatedChildrenPositionX,
      lastSwipedDirection.current,
    ],
  );

  const swipePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: handlePanResponderRelease,
    }),
  ).current;

  const interpolatedContainerHeight = animatedContainerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, layoutDimensionsRef.current.height],
  });

  const interpolatedTranslateX = animatedChildrenPositionX.interpolate({
    inputRange: [-1, 1],
    outputRange: [-layoutDimensionsRef.current.width, layoutDimensionsRef.current.width],
  });

  const animatedContainerStyles = useMemo(
    () => [
      { height: layoutDimensionsRef.current.height ? interpolatedContainerHeight : null },
      styles.container,
    ],
    [layoutDimensionsRef.current, interpolatedContainerHeight, styles],
  );

  const actionStyles = useMemo(
    () => [
      styles.backgroundView,
      {
        height: layoutDimensionsRef.current.height,
        width: layoutDimensionsRef.current.width,
      },
    ],
    [styles, layoutDimensionsRef.current],
  );

  const animatedMainStyles = useMemo(
    () => ({ transform: [{ translateX: interpolatedTranslateX }] }),
    [interpolatedTranslateX],
  );

  const _renderMainComponent = useCallback(
    () => (
      <Animated.View
        onLayout={_onLayoutChange}
        style={animatedMainStyles}
        {...swipePanResponder.panHandlers}
      >
        {children}
      </Animated.View>
    ),
    [animatedMainStyles, swipePanResponder, children],
  );

  const _renderActionComponent = useCallback(
    () => (
      <View style={actionStyles}>
        {swipeDirection === SwipeDirection.left ? rightChild : leftChild}
      </View>
    ),
    [swipeDirection, leftChild, rightChild, actionStyles],
  );

  return (
    <Animated.View style={animatedContainerStyles}>
      {swipeDirection && _renderActionComponent()}
      {_renderMainComponent()}
    </Animated.View>
  );
};

export default memo(Swipeable);
