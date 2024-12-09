import { useAppSelector } from '@store';

import ActionButton from './ActionButton';
import { Colors } from '@themes';

const TextButton = (props: OmittedActionButtonProps) => {
  const theme = useAppSelector(({ theme }) => theme.colors);

  return (
    <ActionButton
      {...props}
      backgroundColor={Colors.transparent}
      foregroundColor={theme.primary}
      styleDisabledBackground={false}
    />
  );
};

export default TextButton;
