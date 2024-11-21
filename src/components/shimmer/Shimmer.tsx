import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, LayoutChangeEvent, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ShimmerDirection } from '@constants';
import { Colors } from '@themes';
import { GlobalThemedStyles } from '@themes/globalStyles';
import { Animation } from '@utility/helpers';

import styles from './styles';

const Shimmer = (props: ShimmerProps) => {
  const [layout, setLayout] = useState<{ h: number; w: number }>({ h: 0, w: 0 });

  const shimmerPositionAnim = useRef(new Animated.Value(-1)).current;

  const globalStyles = GlobalThemedStyles();

  const {
    baseColor,
    highlightColor,
    style,
    children,
    shimmerWidth = layout.w / 2.5,
    direction = ShimmerDirection.ltr,
    period = 1500,
  } = useMemo(() => props, [layout, props]);

  function _measure(e: LayoutChangeEvent): void {
    const { height, width } = e.nativeEvent.layout;
    setLayout({ h: height, w: width });
  }

  useEffect(() => {
    Animation.continuous(Animation.timing(shimmerPositionAnim, 1, period, Easing.linear)).start();
  }, [period, shimmerPositionAnim]);

  const shimmerDirection = useMemo(() => {
    const start = { x: -1, y: 0.5 };
    const end = { x: 2, y: 0.5 };

    if (direction === ShimmerDirection.ltr) {
      return { start, end };
    }

    return { start: end, end: start };
  }, [direction]);

  const translateX = useMemo(() => {
    const outputRange =
      direction === ShimmerDirection.ltr ? [-layout.w, layout.w] : [layout.w, -layout.w];

    return shimmerPositionAnim.interpolate({
      inputRange: [-1, 1],
      outputRange,
    });
  }, [shimmerPositionAnim, layout, direction]);

  const shimmerBackgroundColor = useMemo(
    () =>
      style && typeof style === 'object' && 'backgroundColor' in style
        ? baseColor
        : Colors.transparent,
    [style, baseColor],
  );

  const containerStyles = useMemo(
    () => [style, styles.container, { backgroundColor: shimmerBackgroundColor }],
    [style, shimmerBackgroundColor],
  );

  const _highlighter = useCallback(
    () => (
      <Animated.View
        style={[
          styles.highlighter,
          {
            height: layout.h,
            width: shimmerWidth,
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={[baseColor, highlightColor, baseColor]}
          start={shimmerDirection.start}
          end={shimmerDirection.end}
          locations={[0.3, 0.5, 0.7]}
          style={globalStyles.flex1}
        />
      </Animated.View>
    ),
    [layout, props, translateX],
  );

  return (
    <View
      style={containerStyles}
      onLayout={_measure}
    >
      {children}
      {_highlighter()}
    </View>
  );
};

export default Shimmer;
