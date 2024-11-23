import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  LayoutChangeEvent,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Icon from '@components/icon';
import { defaultLayout, FabAppearance, FabBorderRadius, FabSize, IconFamily } from '@constants';
import { Animation } from '@utility/helpers';
import ThemeContext from '@config/ThemeContext';
import FloatingActionButton from './FloatingActionButton';

const FloatingActionButtonAutoHide = (props: FloatingActionButtonAutoHideProps) => {
  const { theme } = useContext(ThemeContext);
  const layoutDimensionsRef = useRef<ObjectLayout>(defaultLayout);

  const animateFAB = Animation.newValue(0);

  const { visible, visibleDuration = 500 } = props;

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

  const animate = () => {
    Animation.timing(animateFAB, visible ? 0 : 1, visibleDuration).start();
  };

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        animate();
      }, 3000);
    } else {
      animate();
    }
  }, []);

  return (
    <FloatingActionButton
      {...props}
      onLayout={_onLayoutChange}
      style={{
        transform: [
          {
            translateX: animateFAB.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 30 + layoutDimensionsRef.current.width],
            }),
          },
          {
            rotate: animateFAB.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            }),
          },
        ],
      }}
    />
  );
};

export default FloatingActionButtonAutoHide;
