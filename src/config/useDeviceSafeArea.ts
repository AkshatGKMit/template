import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useScalingMetrics from '@config/useScalingMetrics';

const useDeviceSafeArea = ({
  useSafeArea,
  useSafeAreaInLandscape,
  useSafeAreaInPortrait,
  bottomInset,
  leftInset,
  rightInset,
  topInset,
}: DeviceSafeArea) => {
  const insets = useSafeAreaInsets();
  const { portrait, landscape } = useScalingMetrics();

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

    if (useSafeAreaInLandscape && landscape) {
      return {
        insetRight: right,
        insetLeft: left,
      };
    }

    if (useSafeAreaInPortrait && portrait) {
      return {
        insetTop: top,
        insetBottom: bottom,
      };
    }

    return {
      insetTop: topInset ? top : 0,
      insetRight: rightInset ? right : 0,
      insetBottom: bottomInset ? bottom : 0,
      insetLeft: leftInset ? left : 0,
    };
  }, [insets, useSafeArea, landscape, portrait, bottomInset, leftInset, rightInset, topInset]);
};

export default useDeviceSafeArea;
