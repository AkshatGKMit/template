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
      <AppBar.Extended
        title={'Template'}
        leading={{ family: 'MaterialIcons', name: 'menu' }}
        trailing={[
          { icon: { family: 'MaterialIcons', name: 'settings' }, title: 'Filter' },
          { icon: { family: 'MaterialIcons', name: 'search' }, title: 'Filter' },
          { icon: { family: 'MaterialIcons', name: 'mood' }, title: 'Filter' },
          { icon: { family: 'MaterialIcons', name: 'favorite' }, title: 'Filter' },
          { icon: { family: 'MaterialIcons', name: 'numbers' }, title: 'Filter' },
        ]}
      />
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
