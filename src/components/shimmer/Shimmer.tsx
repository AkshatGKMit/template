import { useCallback, useEffect, useMemo, useState } from 'react';
import { View, LayoutChangeEvent, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { SHIMMER_DIRECTION } from '@constants';
import { Colors } from '@themes';
import { globalStyles } from '@themes/globalStyles';
import { Animation } from '@utility/helpers';

import styles from './styles';
import { useAppSelector } from '@store';

const Shimmer = (props: ShimmerProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const [layout, setLayout] = useState({ h: 0, w: 0 });

  const shimmerPositionAnimX = Animation.newValue(-1);
  const shimmerPositionAnimY = Animation.newValue(-1);

  const {
    baseColor = theme.all.inverseOnSurface,
    highlightColor = theme.all.surfaceBright,
    style,
    children,
    shimmerWidth = layout.w / 2.5,
    direction = SHIMMER_DIRECTION.LTR,
    period = 3000,
  } = useMemo(() => props, [layout, props]);

  function _measure(e: LayoutChangeEvent): void {
    const { height, width } = e.nativeEvent.layout;
    setLayout({ h: height, w: width });
  }

  useEffect(() => {
    Animation.continuous(Animation.timing(shimmerPositionAnimX, 1, period, Easing.linear)).start();
    Animation.continuous(Animation.timing(shimmerPositionAnimY, 1, period, Easing.linear)).start();
  }, [period, shimmerPositionAnimX, shimmerPositionAnimY]);

  const shimmerDirection = useMemo(() => {
    const start = { x: -1, y: 0.5 };
    const end = { x: 2, y: 0.5 };

    if (direction === SHIMMER_DIRECTION.LTR) {
      return { start, end };
    }

    return { start: end, end: start };
  }, [direction]);

  const translateX = shimmerPositionAnimX.interpolate({
    inputRange: [-1, 1],
    outputRange: [-layout.w * Math.sqrt(2), layout.w * Math.sqrt(2)],
  });

  const translateY = shimmerPositionAnimY.interpolate({
    inputRange: [-1, 1],
    outputRange: [-layout.h * Math.sqrt(2), layout.h * Math.sqrt(2)],
  });

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
            transform: [{ translateX }, { translateY }],
          },
        ]}
      >
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={[baseColor, highlightColor, baseColor]}
            start={shimmerDirection.start}
            end={shimmerDirection.end}
            locations={[0.3, 0.5, 0.7]}
            style={[globalStyles.flex1, { minHeight: layout.h * 1.5 }]}
          />
        </View>
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
