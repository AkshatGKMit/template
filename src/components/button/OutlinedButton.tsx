import { useAppSelector } from '@store';
import { Colors } from '@themes';
import { colorWithOpacity } from '@utility/helpers';

import ActionButton from './ActionButton';

const OutlinedButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  const { disabled } = props;

  const outlineColor = disabled ? colorWithOpacity(theme.all.onSurface, 0.12) : theme.all.outline;

  return (
    <ActionButton
      {...props}
      borderRadius={100}
      borderColor={outlineColor}
      borderWidth={1}
      backgroundColor={Colors.transparent}
      foregroundColor={theme.primary}
    />
  );
};

export default OutlinedButton;
