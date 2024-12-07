import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useScalingMetrics from '@config/useScalingMetrics';

const useDeviceSafeArea = ({
  useSafeArea,
  bottomInset,
  leftInset,
  rightInset,
  topInset,
}: DeviceSafeArea) => {
  const insets = useSafeAreaInsets();

  return useMemo(() => {
    const { top, right, bottom, left } = insets;

    if (useSafeArea) {
      return {
        insetTop: top,
        insetRight: right,
        insetBottom: bottom,
        insetLeft: left,
      };
    }

    return {
      insetTop: topInset ? top : 0,
      insetRight: rightInset ? right : 0,
      insetBottom: bottomInset ? bottom : 0,
      insetLeft: leftInset ? left : 0,
    };
  }, [insets, useSafeArea, bottomInset, leftInset, rightInset, topInset]);
};

export default useDeviceSafeArea;
