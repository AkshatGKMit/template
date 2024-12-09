import { View } from 'react-native';
import { Elevation } from '@themes';
import { getShadowStyle } from '@utility/styles';

import ActionButton from './ActionButton';

const ElevatedButton = (props: OmittedActionButtonProps) => {
  const { disabled } = props;

  const buttonElevation = disabled ? Elevation.lvl0 : Elevation.lvl1;

  return (
    <View style={{ ...getShadowStyle(buttonElevation) }}>
      <ActionButton {...props} />
    </View>
  );
};

export default ElevatedButton;
