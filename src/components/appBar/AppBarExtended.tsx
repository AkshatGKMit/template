import { View } from 'react-native';

import { AppBarConstants } from '@constants';

import AppBarMain from './AppBarMain';
import ThemedStyles from './styles';

const AppBarExtended = (props: ExtendedAppBarProps) => {
  const styles = ThemedStyles();

  const { trailing, iconColor } = props;
  const { targetSize, gap, maxExtendedTrailing } = AppBarConstants;

  const trailingLength = Math.min(trailing?.length ?? 0, maxExtendedTrailing);

  const trailingSize = trailingLength * targetSize + gap;

  return (
    <AppBarMain
      {...props}
      trailing={<View style={[styles.extendedTrailingContainer, { width: trailingSize }]}></View>}
    />
  );
};

export default AppBarExtended;
