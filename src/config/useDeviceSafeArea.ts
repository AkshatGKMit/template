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
        marginTop: top,
        marginRight: right,
        marginBottom: bottom,
        marginLeft: left,
      };
    }

    if (useSafeAreaInLandscape && landscape) {
      return {
        marginRight: right,
        marginLeft: left,
      };
    }

    if (useSafeAreaInPortrait && portrait) {
      return {
        marginTop: top,
        marginBottom: bottom,
      };
    }

    return {
      marginTop: topInset ? top : 0,
      marginRight: rightInset ? right : 0,
      marginBottom: bottomInset ? bottom : 0,
      marginLeft: leftInset ? left : 0,
    };
  }, [insets, useSafeArea, landscape, portrait, bottomInset, leftInset, rightInset, topInset]);
};

export default useDeviceSafeArea;
