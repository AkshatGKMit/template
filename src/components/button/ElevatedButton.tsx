import { View } from 'react-native';
import { getShadowStyle } from '@utility/styles';

import ActionButton from './ActionButton';
import { COMMON_BUTTON_CONSTANTS } from '@constants/componentSpecifications';
import { useAppSelector } from '@store';

const ElevatedButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { disabled } = props;

  const { COLOR, MEASUREMENTS } = COMMON_BUTTON_CONSTANTS.ELEVATED;

  const { CONTAINER_SHADOW, CONTAINER_COLOR, LABEL_COLOR } = COLOR;
  const { CONTAINER_ELEVATION, DISABLED_CONTAINER_ELEVATION } = MEASUREMENTS;

  const buttonElevation = disabled ? DISABLED_CONTAINER_ELEVATION : CONTAINER_ELEVATION;

  return (
    <View style={{ ...getShadowStyle(buttonElevation, theme.all[CONTAINER_SHADOW]) }}>
      <ActionButton
        backgroundColor={theme.all[CONTAINER_COLOR]}
        foregroundColor={theme.all[LABEL_COLOR]}
        {...props}
      />
    </View>
  );
};

export default ElevatedButton;
