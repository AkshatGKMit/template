import { View } from 'react-native';

import IconButton from '@components/iconButton';
import { AppBarConstants } from '@constants';

import ThemedStyles from './styles';

export const TrailingContainer = ({ trailing, iconColor }: TrailingContainerProps) => {
  const styles = ThemedStyles();

  const { iconSize } = AppBarConstants;

  return (
    <View style={styles.trailingContainer}>
      {trailing && (
        <IconButton
          color={iconColor}
          {...trailing}
          size={iconSize}
        />
      )}
    </View>
  );
};
