import { View } from 'react-native';

import { IconButton } from '@components/iconButton';
import { APP_BAR_CONSTANTS } from '@constants';

export const TrailingContainer = ({
  style: styles,
  trailing,
  iconColor,
}: TrailingContainerProps) => {
  const { ICON_TYPOGRAPHY: iconSize } = APP_BAR_CONSTANTS;

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
