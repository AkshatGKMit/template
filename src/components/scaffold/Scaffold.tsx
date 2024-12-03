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
  } = props;
  const marginStyles = useDeviceSafeArea({
    useSafeArea,
    useSafeAreaInLandscape,
    useSafeAreaInPortrait,
    bottomInset,
    leftInset,
    rightInset,
    topInset,
  });

  const globalThemedStyles = GlobalThemedStyles();

  return (
    <View style={globalThemedStyles.screen}>
      <AppBar />
      <View
        {...props}
        style={[style, marginStyles]}
      >
        {children}
      </View>
    </View>
  );
};

export default Scaffold;
