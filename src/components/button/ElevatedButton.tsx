import { Elevation } from '@themes';
import { getShadowStyle } from '@utility/styles';

import ActionButton from './ActionButton';

const ElevatedButton = (props: {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: IconType;
  borderRadius?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  elevation?: Elevation;
}) => {
  const { disabled, elevation } = props;

  const buttonElevation = disabled ? Elevation.lvl0 : (elevation ?? Elevation.lvl1);

  return (
    <ActionButton
      {...props}
      style={{ ...getShadowStyle(buttonElevation) }}
    />
  );
};

export default ElevatedButton;
