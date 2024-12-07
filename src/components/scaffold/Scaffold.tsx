import { StyleProp, View, ViewStyle } from 'react-native';

import { GlobalThemedStyles } from '@themes/globalStyles';
import useDeviceSafeArea from '@config/useDeviceSafeArea';

const Scaffold = (props: ScaffoldProps) => {
  const { children, style, useSafeArea, bottomInset, leftInset, rightInset, topInset, appBar } =
    props;
  const { insetTop, insetBottom, insetLeft, insetRight } = useDeviceSafeArea({
    useSafeArea,
    bottomInset,
    leftInset,
    rightInset,
    topInset,
  });

  const globalThemedStyles = GlobalThemedStyles();

  const paddingStyles = {
    paddingTop: !appBar ? insetTop : null,
    paddingBottom: insetBottom,
    paddingLeft: insetLeft,
    paddingRight: insetRight,
  };

  const screenStyle: StyleProp<ViewStyle> = [globalThemedStyles.screen, paddingStyles];

  return (
    <View style={screenStyle}>
      {appBar}
      <View
        {...props}
        style={style}
      >
        {children}
      </View>
    </View>
  );
};

export default Scaffold;
