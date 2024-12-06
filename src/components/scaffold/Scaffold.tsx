import { View, ViewProps } from 'react-native';

import { GlobalThemedStyles } from '@themes/globalStyles';
import AppBar from '@components/appBar';
import useDeviceSafeArea from '@config/useDeviceSafeArea';

const Scaffold = (props: ScaffoldProps) => {
  const {
    children,
    style,
    useSafeArea,
    useSafeAreaInLandscape,
    useSafeAreaInPortrait,
    bottomInset,
    leftInset,
    rightInset,
    topInset,
    appBar,
  } = props;
  const { insetTop, insetBottom, insetLeft, insetRight } = useDeviceSafeArea({
    useSafeArea,
    useSafeAreaInLandscape,
    useSafeAreaInPortrait,
    bottomInset,
    leftInset,
    rightInset,
    topInset,
  });

  const paddingStyles = {
    paddingTop: insetTop,
    paddingBottom: insetBottom,
    paddingLeft: insetLeft,
    paddingRight: insetRight,
  };

  const globalThemedStyles = GlobalThemedStyles();

  return (
    <View style={[globalThemedStyles.screen, paddingStyles]}>
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
