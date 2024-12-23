import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useAppSelector } from '@config/store';
import useDeviceSafeArea from '@config/useDeviceSafeArea';
import { globalStyles, GlobalThemedStyles } from '@themes/globalStyles';

const GradientScreen = ({
  children,
  style,
  useSafeArea,
  useSafeAreaInLandscape,
  useSafeAreaInPortrait,
  bottomInset,
  leftInset,
  rightInset,
  topInset,
}: GradientScreenProps) => {
  const { insetBottom, insetLeft, insetRight, insetTop } = useDeviceSafeArea({
    useSafeArea,
    useSafeAreaInLandscape,
    useSafeAreaInPortrait,
    bottomInset,
    leftInset,
    rightInset,
    topInset,
  });

  const theme = useAppSelector((state) => state.theme.colors);

  const globalThemeStyles = GlobalThemedStyles();

  const marginStyles = {
    marginTop: insetTop,
    marginBottom: insetBottom,
    marginLeft: insetLeft,
    marginRight: insetRight,
  };

  return (
    <LinearGradient
      colors={theme.screenGradient}
      style={globalThemeStyles.screen}
    >
      <View style={[globalStyles.flex1, style, marginStyles]}>{children}</View>
    </LinearGradient>
  );
};

export default GradientScreen;
