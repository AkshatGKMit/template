import { useCallback, useEffect, useRef } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { Animation } from '@utility/helpers';

import FloatingActionButton from './FloatingActionButton';

const FloatingActionButtonAutoHide = (props: FabAutoHideProps) => {
  const { visible, visibleDuration = 250 } = props;

  const fabPositionX = useRef<number>(0);

  const animateFAB = Animation.newValue(0);

  let timeout: NodeJS.Timeout;

  const _onLayoutChange = useCallback((e: LayoutChangeEvent) => {
    const { width: w, x } = e.nativeEvent.layout;
    fabPositionX.current = w + x;
  }, []);

  const animate = () => {
    Animation.timing(animateFAB, visible ? 0 : 1, visibleDuration).start();
  };

  useEffect(() => {
    clearTimeout(timeout);

    if (visible) {
      animate();
    } else {
      timeout = setTimeout(() => {
        animate();
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [visible]);

  const translateXInterpolate = animateFAB.interpolate({
    inputRange: [0, 1],
    outputRange: [0, fabPositionX.current],
  });

  return (
    <FloatingActionButton.Shrink
      {...props}
      onLayout={_onLayoutChange}
      style={{ transform: [{ translateX: translateXInterpolate }] }}
    />
  );
};

export default FloatingActionButtonAutoHide;
