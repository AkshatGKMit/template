import { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { useAppSelector } from '@config/store';
import useScalingMetrics from '@config/useScalingMetrics';
import { GlobalThemedStyles } from '@themes/globalStyles';

const GradientScreen = ({
  children,
  style,
  useSafeArea,
  useSafeAreaInLandscape,
  useSafeAreaInPortrait,
  bottomInset: isBottomInset,
  leftInset: isLeftInset,
  rightInset: isRightInset,
  topInset: isTopInset,
}: GradientScreenProps) => {
  const insets = useSafeAreaInsets();

  const { portrait, landscape } = useScalingMetrics();

  const theme = useAppSelector((state) => state.theme.colors);

  const globalStyles = GlobalThemedStyles();

  const marginStyles = useMemo(() => {
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
      marginTop: isTopInset ? top : 0,
      marginRight: isRightInset ? right : 0,
      marginBottom: isBottomInset ? bottom : 0,
      marginLeft: isLeftInset ? left : 0,
    };
  }, [
    insets,
    useSafeArea,
    landscape,
    portrait,
    isBottomInset,
    isLeftInset,
    isRightInset,
    isTopInset,
  ]);

  return (
    <LinearGradient
      colors={theme.screenGradient}
      style={globalStyles.screen}
    >
      <View style={[globalStyles.flex1, style, marginStyles]}>{children}</View>
    </LinearGradient>
  );
};

export default GradientScreen;
