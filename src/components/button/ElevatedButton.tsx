import { View } from 'react-native';

import { COMMON_BUTTON_CONSTANTS } from '@constants';
import { useAppSelector } from '@store';
import { getShadowStyle } from '@utility/styles';

import ActionButton from './ActionButton';

const {
  CONTAINER_SHADOW_COLOR,
  CONTAINER_COLOR,
  LABEL_COLOR,
  CONTAINER_ELEVATION,
  DISABLED_CONTAINER_ELEVATION,
} = COMMON_BUTTON_CONSTANTS.ELEVATED.THEME;

const ElevatedButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { disabled } = props;

  const buttonElevation = disabled ? DISABLED_CONTAINER_ELEVATION : CONTAINER_ELEVATION;

  return (
    <View style={{ ...getShadowStyle(buttonElevation, theme.all[CONTAINER_SHADOW_COLOR]) }}>
      <ActionButton
        backgroundColor={theme.all[CONTAINER_COLOR]}
        foregroundColor={theme.all[LABEL_COLOR]}
        {...props}
      />
    </View>
  );
};

export default ElevatedButton;
