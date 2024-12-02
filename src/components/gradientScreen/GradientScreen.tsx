import { useContext, useEffect, useState } from 'react';
import { Platform, StatusBar, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import ThemeContext from '@config/ThemeContext';
import useScalingMetrics from '@config/useScalingMetrics';
import { GlobalThemedStyles } from '@themes/globalStyles';
import { useAppSelector } from '@config/store';

const GradientScreen = ({
  children,
  style,
  useSafeArea,
  showStatusBar,
  useSafeAreaInLandscape,
  useSafeAreaInPortrait,
  bottomInset: isBottomInset,
  leftInset: isLeftInset,
  rightInset: isRightInset,
  topInset: isTopInset,
}: GradientScreenProps) => {
  const insets = useSafeAreaInsets();

  const { portrait, landscape } = useScalingMetrics();

  const { top: topInsets, right: rightInsets, bottom: bottomInsets, left: leftInsets } = insets;

  const theme = useAppSelector((state) => state.theme.colors);

  const globalStyles = GlobalThemedStyles();

  const [marginStyles, setMarginStyles] = useState<StyleProp<ViewStyle>>({});

  const safeAreaMargins = () => {
    setMarginStyles({
      marginTop: topInsets,
      marginRight: rightInsets,
      marginBottom: bottomInsets,
      marginLeft: leftInsets,
    });
  };

  const landscapeSafeAreaMargins = () => {
    setMarginStyles({
      marginRight: rightInsets,
      marginLeft: leftInsets,
    });
  };

  const portraitSafeAreaMargins = () => {
    setMarginStyles({
      marginTop: topInsets,
      marginBottom: bottomInsets,
    });
  };

  const changeMarginStyles = () => {
    if (useSafeArea) {
      safeAreaMargins();
      return;
    }

    if (useSafeAreaInLandscape && landscape) {
      landscapeSafeAreaMargins();
      return;
    }

    if (useSafeAreaInPortrait && portrait) {
      portraitSafeAreaMargins();
      return;
    }

    setMarginStyles({
      marginTop: isTopInset ? topInsets : 0,
      marginRight: isRightInset ? rightInsets : 0,
      marginBottom: isBottomInset ? bottomInsets : 0,
      marginLeft: isLeftInset ? leftInsets : 0,
    });
  };

  useEffect(() => {
    changeMarginStyles();
  }, [
    insets,
    useSafeArea,
    showStatusBar,
    useSafeAreaInLandscape,
    useSafeAreaInPortrait,
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
