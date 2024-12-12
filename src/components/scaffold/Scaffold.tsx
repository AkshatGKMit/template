import { StyleProp, View, ViewStyle } from 'react-native';

import { GlobalThemedStyles } from '@themes/globalStyles';
import useDeviceSafeArea from '@config/useDeviceSafeArea';

const Scaffold = (props: ScaffoldProps) => {
  const { children, style, useSafeArea, bottomInset, leftInset, rightInset, topInset } = props;
  const { insetTop, insetBottom, insetLeft, insetRight } = useDeviceSafeArea({
    useSafeArea,
    bottomInset,
    leftInset,
    rightInset,
    topInset,
  });

  const globalThemedStyles = GlobalThemedStyles();

  const paddingStyles = {
    paddingTop: insetTop,
    paddingBottom: insetBottom,
    paddingLeft: insetLeft,
    paddingRight: insetRight,
  };

  const screenStyle: StyleProp<ViewStyle> = [globalThemedStyles.screen, paddingStyles];

  return (
    <View
      {...props}
      style={screenStyle}
    >
      <View style={style}>{children}</View>
    </View>
  );
};

export default Scaffold;
